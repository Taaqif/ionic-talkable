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
import { Network } from '@ionic-native/network';

@Injectable()

export class DownloadService {
    options: any;
    fileTransfer: FileTransferObject;
    downloadedVideos;
    q: any;
    hasNetwork: boolean = false;
    videoURL: string = "http://feedback.talkable.org.au/";
    constructor(
        public plt: Platform,
        public http: Http,
        public storage: Storage,
        public fs: FileServiceProvider,
        private transfer: FileTransfer,
        private file: File,
        public settings: Settings,
        private backgroundMode: BackgroundMode,
        private network: Network) {
        // watch network for a disconnect
        let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
            console.log('network was disconnected :-(');
            this.hasNetwork = false;
            this.stopDownloading();
        });
        let connectSubscription = this.network.onConnect().subscribe(() => {
            console.log('network connected!');
            this.hasNetwork = true;
            this.startDownloading();
        });

        this.settings.load();
        this.backgroundMode.configure({ silent: true });
        this.fileTransfer = this.transfer.create();
        this.storage.get("downloadedVideos").then(downloadedVideos => {
            if (downloadedVideos) {
                this.downloadedVideos = downloadedVideos;

            } else {
                this.downloadedVideos = {};
            }
        })
        // create a queue object with concurrency 1
        let self = this;
        //download to tmp directory then move when done
        this.q = queue(function (task: any, callback) {
            self.file.checkFile(self.file.dataDirectory, task.id + '.mp4').then(exists => {
                self.saveDownloadedvideo(task.id);
                callback();
            }).catch(err => {
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
                            }).catch(err => {
                                self.downloadedVideos[task.id].downloaded = null;
                                self.forceDownload(task.id);
                                callback();

                            })

                    })
                    .catch(err => {
                        self.downloadedVideos[task.id].downloaded = null;
                        self.forceDownload(task.id);
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
            this.addToQueue(id, true);

        }

    }
    pauseDownloading() {
        this.q.pause();
    }
    resumeDownloading() {
        this.q.resume();
    }
    addToQueue(id, rush) {
        if (!this.downloadedVideos[id]) {
            this.downloadedVideos[id] = {}
        }
        this.downloadedVideos[id].downloaded = false;
        this.downloadedVideos[id].id = id
        this.downloadedVideos[id].percent = 0;
        if (rush) {
            this.q.unshift({ id: id }, function (err) {
                console.log('finished downloading' + id);
            });
        } else {
            this.q.push({ id: id }, function (err) {
                console.log('finished downloading ' + id + '');
            });
        }

    }
    startDownloading() {
        //check for netwrok
        if (this.settings.getValue("videoPreference") == 'download') {
            this.backgroundMode.enable();
            this.storage.get("currentWeek").then(currentWeek => {
                this.fs.getWeekContent(currentWeek).subscribe(week => {
                    // add some items to the queue
                    week.videos.forEach(video => {
                        this.addToQueue(video.id, false)
                    });
                    week.weeklyKeyWordSigns.videos.forEach(video => {
                        this.addToQueue(video, false)
                    });

                })
            })

        }
    }
    stopDownloading() {
        this.q.kill();
        this.backgroundMode.disable();
    }
    isDownloaded(id) {
        return this.downloadedVideos[id].downloaded;
    }
}
