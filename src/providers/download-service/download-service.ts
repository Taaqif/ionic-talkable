import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage'
import { Settings } from "../../providers/settings";
import { Platform, AlertController, ToastController } from 'ionic-angular';
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
    maxRetries: number = 5;
    hasNetwork: boolean = false;
    videoURL: string = "http://feedback.talkable.org.au/";
    wifiConnected = null;;
    constructor(
        public plt: Platform,
        public http: Http,
        public storage: Storage,
        public fs: FileServiceProvider,
        private transfer: FileTransfer,
        private file: File,
        public settings: Settings,
        private backgroundMode: BackgroundMode,
        private network: Network,
        public alertCtrl: AlertController,
        public toastCtrl: ToastController) {

        // watch network for a disconnect
        let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
            console.log('network was disconnected :-(');
            this.hasNetwork = false;
            this.stopDownloading();
        });
        let connectSubscription = this.network.onConnect().subscribe(() => {
            console.log('network connected!');
            let self = this
            setTimeout(() => {
                if (self.network.type === 'wifi') {
                    self.wifiConnected = true;
                }
            }, 1000);
            this.hasNetwork = true;
            this.startDownloading();
        });
        this.settings.load().then(data=>{
            this.options = this.settings.allSettings;
        })
        // this.backgroundMode.configure({ silent: true });
        this.fileTransfer = this.transfer.create();
        this.storage.get("downloadedVideos").then(downloadedVideos => {
            console.log(downloadedVideos)
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
            console.log("in q")
            self.file.checkFile(self.file.dataDirectory, task.id + '.mp4').then(exists => {
                console.log("ex")
                self.saveDownloadedvideo(task.id);
                callback();
            }).catch(err => {
                console.log("nex")
                // Download a file:
                self.fileTransfer.onProgress(progress => {
                    console.log("pr")
                    var percent = progress.loaded / progress.total * 100;
                    console.log(progress)
                    percent = Math.round(percent);
                    self.downloadedVideos[task.id].percent = percent;
                })


                self.downloadedVideos[task.id].downloaded = false;
                self.downloadedVideos[task.id].tries++;

                self.fileTransfer.download(
                    

                    self.getURLPath(task.id),
                    self.file.dataDirectory + 'tmp/' + task.id + '.mp4')
                    .then(done => {
                        console.log("dl")
                        self.file.moveFile(self.file.dataDirectory + 'tmp/', task.id + '.mp4',
                            self.file.dataDirectory, task.id + '.mp4').then(entry => {
                                self.saveDownloadedvideo(task.id);
                                callback();
                            }).catch(err => {
                                self.downloadedVideos[task.id].downloaded = null;
                                if (self.downloadedVideos[task.id].tries < self.maxRetries) {
                                    self.forceDownload(task.id);
                                }
                                callback();

                            })

                    })
                    .catch(err => {
                        console.log(err)
                        if (self.downloadedVideos[task.id]) {
                            self.downloadedVideos[task.id].downloaded = null;
                        }
                        if (self.downloadedVideos[task.id].tries < self.maxRetries) {
                            self.forceDownload(task.id);
                        }
                        callback();
                    });
            })
            console.log(self.fileTransfer)


        }, 1);
        // assign a callback
        this.q.drain = function () {
            self.stopDownloading();
            //stop downloading, put app back into non background

            Object.keys(self.downloadedVideos).forEach((el) => { self.downloadedVideos[el].tries = 0 })
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
        return this.videoURL + id.replace(" ", "").toLowerCase() + '.mp4';
    }
    saveDownloadedvideo(id) {
        if(!this.downloadedVideos[id].downloaded){
            let toast = this.toastCtrl.create({
                message: 'Video '+ id+ " downloaded",
                duration: 3000,
                showCloseButton: true,
                closeButtonText: "OK"
            });
            toast.present();
        }
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
        if (this.q.workersList() && this.q.workersList()[0] && this.q.workersList()[0].data.id != id) {
            this.q.remove((data, priority) => {
                return data.id == id;
            })
        }
        this.addToQueue(id, true);

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
        if (!this.downloadedVideos[id].downloaded) {
            this.downloadedVideos[id].downloaded = false;

        }
        if (!this.downloadedVideos[id].tries) {
            this.downloadedVideos[id].tries = 0
        }
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
        console.log(this.network.type)
        //check for netwrok
        this.settings.load().then(done => {
            if (this.settings.getValue("videoPreference") == 'download') {
                if (this.network.type != 'wifi') {
                    if (this.options.useMobileData) {
                        this.initDownloads();
                    } 

                } else {
                    this.initDownloads()
                }
            }
        });

    }
    initDownloads() {
        // this.backgroundMode.enable();
        this.storage.get("currentWeek").then(currentWeek => {
            let week = this.fs.getWeekContent(currentWeek)
                // add some items to the queue
                week.videos.forEach(video => {
                    this.addToQueue(video.id, false)
                });
                week.weeklyKeyWordSigns.videos.forEach(video => {
                    this.addToQueue(video, false)
                });

        })
    }
    stopDownloading() {
        // if (this.backgroundMode.isEnabled) {
        //     this.backgroundMode.disable();
        // }
        this.fileTransfer.abort();
        this.q.kill();
        Object.keys(this.downloadedVideos).forEach((el) => {
            if (this.downloadedVideos[el] && !this.downloadedVideos[el].downloaded) {
                delete this.downloadedVideos[el];
            }
        })

        this.storage.set("downloadedVideos", this.downloadedVideos)
    }
    isDownloaded(id) {
        return this.downloadedVideos[id] && this.downloadedVideos[id].downloaded;
    }
}
