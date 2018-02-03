import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage'
import { Settings } from "../../providers/settings";
import { Platform } from 'ionic-angular';
import { Component } from '@angular/core';


@Injectable()

export class VideoService {
    options: any;
    constructor(public plt: Platform, private settings: Settings, public http: Http, public storage: Storage) {
        this.settings.load().then(() => {
            this.options = this.settings.allSettings;
        })
    }
    playVideo(id, url) {
        if (this.settings.getValue('videoPreference') == 'download') {
            //local videos
            //check if video is downloaded
            if (this.plt.is('android')) {

            } else {

            }
        } else {

            //http://www.intheloftstudios.com/blog/detecting-html5-video-fullscreen-and-events
        }
        //check setting
        //if local
        //check if file is downloaded
        //download
        //give prompt
    }

}
@Component({
    selector: 'video-modal',
    template: `
        <h1>Tour of Heroes</h1>
        <app-hero-main [hero]="hero"></app-hero-main>
    `
})
class VideoModal {

    constructor() {

    }

}