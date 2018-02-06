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
import { BackgroundMode } from '@ionic-native/background-mode';

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
        private file: File,
        public settings: Settings,
        private backgroundMode: BackgroundMode) {
        this.settings.load();
        this.backgroundMode.configure({silent: true});
        this.fileTransfer = this.transfer.create();
        this.storage.get("downloadedVideos").then(downloadedVideos => {
            console.log(downloadedVideos)
            if (downloadedVideos) {
                this.downloadedVideos = downloadedVideos;

            } else {
                this.downloadedVideos = {};
            }
            // create a queue object with concurrency 1
            let self = this;
            //download to tmp directory then move when done
            this.q = queue(function (task: any, callback) {
                self.file.checkFile(self.file.dataDirectory, task.id + '.mp4').then(exists => {
                    self.saveDownloadedvideo(task.id);
                    callback();
                }).catch(err => {
                    if (!self.downloadedVideos[task.id]) {
                        self.downloadedVideos[task.id] = {}
                    }
                    self.downloadedVideos[task.id].downloaded = false;
                    self.downloadedVideos[task.id].id = task.id
                    self.downloadedVideos[task.id].percent = 0;
                    // Download a file:
                    self.fileTransfer.onProgress(progress => {
                        
                        var percent = progress.loaded / progress.total * 100;
                        percent = Math.round(percent);
                        self.downloadedVideos[task.id].percent = percent;
                    })
                    self.fileTransfer.download(
                        self.videoURL + task.id + '.mp4',
                        self.file.dataDirectory + 'tmp/' + task.id + '.mp4')
                        .then(done => {
                            self.file.moveFile(self.file.dataDirectory + 'tmp/', task.id + '.mp4',
                            self.file.dataDirectory, task.id + '.mp4').then(entry => {
                                self.saveDownloadedvideo(task.id);
                                callback();
                            }).catch(err=>{
                                self.downloadedVideos[task.id].downloaded = null;
                                self.startDownloading();
                                callback();
                                
                            })
                            
                        })
                        .catch(err => {
                            self.downloadedVideos[task.id].downloaded = null;
                            //maybe retry the download
                            // self.startDownloading();
                            callback();
                        });
                })


            }, 1);
            // assign a callback
            this.q.drain = function () {
                //stop downloading, put app back into non background
                this.backgroundMode.disable();
                console.log('all items have been processed');
            };
        })
    }
    getQueuedDownloads() {
        return _.filter(this.downloadedVideos, ['downloaded', false])
    }
    getAllDownloaded() {
        return _.filter(this.downloadedVideos, ['downloaded', true])
    }
    getPercent(id) {
        return this.downloadedVideos[id].percent
    }
    getFilePath(id) {
        return this.file.dataDirectory + id + '.mp4';
    }
    getURLPath(id) {
        return this.videoURL + id + '.mp4';
    }
    saveDownloadedvideo(id) {
        if (this.downloadedVideos[id]) {
            this.downloadedVideos[id].downloaded = true;
        } else {
            this.downloadedVideos[id] = {}
            this.downloadedVideos[id].downloaded = true;
        }

        this.storage.set("downloadedVideos", this.downloadedVideos)
    }
    forceDownload(id) {
        //check if q has id 
        if (this.q.workersList() && this.q.workersList()[0].data.id != id) {
            this.q.remove((data, priority) => {
                return data.id == id;
            })
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
        //check for netwrok
        if (this.settings.getValue("videoPreference") == 'download') {
            this.backgroundMode.enable();
            this.storage.get("currentWeek").then(currentWeek => {
                this.fs.getWeekContent(currentWeek).subscribe(week => {
                    // add some items to the queue
                    week.videos.forEach(video => {
                        this.q.push({ id: video.id }, function (err) {
                            console.log('finished downloading ' + video.id + '');
                        });
                    });
                    week.weeklyKeyWordSigns.videos.forEach(video => {
                        this.q.push({ id: video }, function (err) {
                            console.log('finished downloading ' + video + '');
                        });
                    });

                })
            })

        }

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
