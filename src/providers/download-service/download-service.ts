import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage'
import { Settings } from "../../providers/settings";
import { Platform } from 'ionic-angular';
import { FileServiceProvider } from '../file-service/file-service';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { queue, AsyncQueue } from 'async';

@Injectable()

export class DownloadService {
    options: any;
    fileTransfer: FileTransferObject;
    downloadedVideos;
    q: AsyncQueue<any>;
    videoURL: string = "videos.talkable.org.au/";
    constructor(
        public plt: Platform,
        private settings: Settings,
        public http: Http,
        public storage: Storage,
        public fs: FileServiceProvider,
        private transfer: FileTransfer,
        private file: File) {
        this.fileTransfer = this.transfer.create();
        this.storage.get("downloadedVideos").then(downloadedVideos => {
            this.downloadedVideos = downloadedVideos;
            // create a queue object with concurrency 1
            let self = this;
            this.q = queue(function(task:any, callback) {
                self.file.checkFile(self.file.dataDirectory, task.id + '.mp4').then(exists => {
                    if (exists) {
                        self.downloadedVideos[task.id] = true;
                        callback();
                    } else {
                        // Download a file:
                        self.fileTransfer.download(
                            self.videoURL + task.id + '.mp4',
                            self.file.dataDirectory + task.id + '.mp4')
                            .then(done => {
                                self.downloadedVideos[task.id] = true;
                                callback();
                            })
                            .catch(err => {
                                //maybe retry the download
                                callback();
                            });
                    }
                })
            }, 1);
            // assign a callback
            this.q.drain = function() {
                //stop downloading, put app back into non background
                console.log('all items have been processed');
            };
        })
    }
    forceDownload(id){
        this.q.unshift({id: id}, function(err) {
            console.log('finished downloading foo');
        });
    }
    pauseDownloading(){
        this.q.pause();
    }
    resumeDownloading(){
        this.q.resume();
    }
    startDownloading() {
        this.storage.get("currentWeek").then(currentWeek => {
            this.fs.getWeekContent(currentWeek).subscribe(week => {
                // add some items to the queue
                week.videos.forEach(video => {
                    this.q.push({id: video.id}, function(err) {
                        console.log('finished downloading '+video.id+'');
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
        return this.downloadedVideos[id];
    }
}
