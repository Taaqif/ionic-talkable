import { Component, ChangeDetectorRef } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { DownloadService } from '../../providers/download-service/download-service';


@Component({
  selector: 'page-manage-downloads',
  templateUrl: 'manage-downloads.html',
})
export class ManageDownloadsPage {
  interval: any;

  constructor(public cd: ChangeDetectorRef, public navCtrl: NavController, public navParams: NavParams, public downloadService:DownloadService) {
    
  }
  ngOnInit(){
    this.interval = setInterval( () => {
      this.cd.detectChanges();
    }, 500);
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
