import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage'
import { Settings } from "../../providers/settings";
import { Platform,AlertController, ModalController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { DownloadService } from '../download-service/download-service';
import { VideoModalPage } from "../../pages/video-modal/video-modal";
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { File } from '@ionic-native/file';


@Injectable()

export class VideoService {
    options: any;
    constructor(public plt: Platform, 
        private settings: Settings, 
        public http: Http, 
        public storage: Storage,
        public downloadService: DownloadService,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController,
        private streamingMedia: StreamingMedia,
        private file: File) {
        this.settings.load().then(() => {
            this.options = this.settings.allSettings;
        })
        this.url = this.downloadService.videoURL;
    }
    url;
    playVideo(id) {
        if(this.downloadService.isDownloaded(id)){
            if (this.settings.getValue('videoPreference') == 'download') {
                
                let options: StreamingVideoOptions = {
                    successCallback: () => { console.log('Video played') },
                    errorCallback: (e) => { console.log('Error streaming') },
                    orientation: 'landscape'
                  };
                  this.streamingMedia.playVideo(this.downloadService.getFilePath(id), options);
                // let profileModal = this.modalCtrl.create(VideoModalPage, { url: this.url + id + '.mp4', id: id });
                // profileModal.present();
                //local videos
                //check if video is downloaded
                if (this.plt.is('android')) {
    
                } else {
    
                }
            } else {
    
                //http://www.intheloftstudios.com/blog/detecting-html5-video-fullscreen-and-events
            }
        }else{
            let alert = this.alertCtrl.create({
                title: "Video Not Download",
                subTitle: 'This video has not been downloaded yet. ',
                message: 'Would you like to stream the video or wait for the video to complete downloading?',
                buttons: [
                    
                      {
                        text: 'Stream',
                        handler: () => {
                          this.playVideo(id);
                        }
                      },{
                        text: 'Wait',
                        role: 'cancel',
                        handler: () => {
                            this.downloadService.forceDownload(id);
                        }
                      },
                ]
            });
            alert.present();
        }
        
        //check setting
        //if local
        //check if file is downloaded
        //download
        //give prompt
    }

}
