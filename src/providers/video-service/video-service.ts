import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage'
import { Settings } from "../../providers/settings";
import { Platform, AlertController, ModalController } from 'ionic-angular';
import { DownloadService } from '../download-service/download-service';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';


@Injectable()

export class VideoService {
    options: any;
    videooptions: StreamingVideoOptions = {
        successCallback: () => { console.log('Video played') },
        errorCallback: (e) => { console.log('Error streaming') },
        orientation: 'landscape'
    };
    constructor(public plt: Platform,
        private settings: Settings,
        public http: Http,
        public storage: Storage,
        public downloadService: DownloadService,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController,
        private streamingMedia: StreamingMedia) {
        this.settings.load().then(() => {
            this.options = this.settings.allSettings;
        })
        this.url = this.downloadService.videoURL;
    }
    url;
    playVideo(id) {

        if (this.settings.getValue('videoPreference') == 'download') {
            if (this.downloadService.isDownloaded(id)) {
                this.playLocal(id);
            } else {
                let alert = this.alertCtrl.create({
                    title: "Video Not Download",
                    message: 'Would you like to stream the video or queue for the video for downloading?',
                    buttons: [

                        {
                            text: 'Stream',
                            handler: () => {
                                this.playOnline(id);
                            }
                        }, {
                            text: 'Queue',
                            handler: () => {
                                this.downloadService.forceDownload(id);
                            }
                        },{
                            text: 'Cancel',
                            role: 'cancel',
                            handler: () => {
                                
                            }
                        }
                    ]
                });
                alert.present();
            }
        } else {
            this.playOnline(id);
        }
    }
    playLocal(id) {

        this.streamingMedia.playVideo(this.downloadService.getFilePath(id), this.videooptions);

    }
    playOnline(id) {

        this.streamingMedia.playVideo(this.downloadService.getURLPath(id), this.videooptions);

    }

}
