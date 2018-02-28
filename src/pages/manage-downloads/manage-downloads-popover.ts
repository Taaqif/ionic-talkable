import { Component, } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { DownloadService } from "../../providers/download-service/download-service";

/**
 * Generated class for the ManageDownloadsPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-manage-downloads-popover',
  templateUrl: 'manage-downloads-popover.html',
})
export class ManageDownloadsPopoverPage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams,public downloadService:DownloadService) {
  }

  startDownloading(){
    this.downloadService.startDownloading();
    this.viewCtrl.dismiss();
  }
  stopDownloading(){
    this.downloadService.stopDownloading();
    this.viewCtrl.dismiss();
  }

}
