import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage'
import { Settings } from "../../providers/settings";
import { Platform } from 'ionic-angular';


@Injectable()

export class DownloadService {
    options: any;
    constructor(public plt: Platform, private settings: Settings, public http: Http, public storage: Storage) {
        this.settings.load().then(() => {
            this.options = this.settings.allSettings;
        })
    }
    startDownloading(){

    }
    stopDownloading(){

    }
}
