import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage'
import { Settings } from "../../providers/settings";
import { Platform } from 'ionic-angular';
import { FileServiceProvider } from '../file-service/file-service';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { queue } from 'async';
import * as _ from 'lodash'

@Injectable()

export class DownloadService {
    options: any;
    fileTransfer: FileTransferObject;
    downloadedVideos;
    q: any;
    videoURL: string = "http://feedback.talkable.org.au/";
    constructor(
        public plt: Platform,
        public http: Http,
        public storage: Storage,
        public fs: FileServiceProvider,
        private transfer: FileTransfer,
        private file: File) {
        this.fileTransfer = this.transfer.create();
        this.storage.get("downloadedVideos").then(downloadedVideos => {
            console.log(downloadedVideos)
            if(downloadedVideos){
                this.downloadedVideos = downloadedVideos;

            }else{
                this.downloadedVideos = {};
            }
            // create a queue object with concurrency 1
            let self = this;
            this.q = queue(function (task: any, callback) {
                self.file.checkFile(self.file.dataDirectory, task.id + '.mp4').then(exists => {
                    self.saveDownloadedvideo(task.id);
                    callback();
                }).catch(err => {
                    // Download a file:
                    self.fileTransfer.onProgress(progress => {
                        if(!self.downloadedVideos[task.id]){
                            self.downloadedVideos[task.id] = {}
                        }
                        self.downloadedVideos[task.id].downloaded = false;
                        self.downloadedVideos[task.id].id = task.id
                        var percent =  progress.loaded / progress.total * 100;
                        percent = Math.round(percent);
                        self.downloadedVideos[task.id].percent = percent;
                    })
                    self.fileTransfer.download(
                        self.videoURL + task.id + '.mp4',
                        self.file.dataDirectory + task.id + '.mp4')
                        .then(done => {
                            self.saveDownloadedvideo(task.id);
                            callback();
                        })
                        .catch(err => {
                            //maybe retry the download
                            // self.startDownloading();
                            callback();
                        });
                })


            }, 1);
            // assign a callback
            this.q.drain = function () {
                //stop downloading, put app back into non background
                console.log('all items have been processed');
            };
        })
    }
    getQueuedDownloads(){
        return _.filter(this.downloadedVideos, ['downloaded', false])
    }
    getAllDownloaded(){
        return _.filter(this.downloadedVideos, ['downloaded', true])
    }
    getPercent(id){
        return this.downloadedVideos[id].percent
    }
    getFilePath(id){
        return this.file.dataDirectory + id + '.mp4';
    }
    getURLPath(id){
        return this.videoURL + id + '.mp4';
    }
    saveDownloadedvideo(id){
        if(this.downloadedVideos[id]){
            this.downloadedVideos[id].downloaded = true;
        }else{
            this.downloadedVideos[id] = {}
            this.downloadedVideos[id].downloaded = true;
        }
        
        this.storage.set("downloadedVideos", this.downloadedVideos)
    }
    forceDownload(id) {
        //check if q has id 
        if(this.q.workersList() && this.q.workersList()[0].data.id != id){
            this.q.remove((data, priority)=>{
                return data.id == id;
            })
            this.q.unshift({ id: id }, function (err) {
                console.log('finished downloading' + id);
            });
        }else{
            this.q.unshift({ id: id }, function (err) {
                console.log('finished downloading' + id);
            });
        }
        
    }
    pauseDownloading() {
        this.q.pause();
    }
    resumeDownloading() {
        this.q.resume();
    }
    startDownloading() {
        this.storage.get("currentWeek").then(currentWeek => {
            this.fs.getWeekContent(currentWeek).subscribe(week => {
                // add some items to the queue
                week.videos.forEach(video => {
                    //check if already in task list
                    // if(this.q.workersList.)
                    this.q.push({ id: video.id }, function (err) {
                        console.log('finished downloading ' + video.id + '');
                    });
                });

            })
        })

        //put app to non sleeping
        //get current week, 
        //check if file is downloaded 
        //in not download videos for that week
        //start downloading vidoe signs
        //save downloaded file list to storage 
        //put app back to normal when done

    }
    stopDownloading() {

        this.q.kill();
    }
    isDownloaded(id) {
        return this.downloadedVideos[id].downloaded;
    }
}
