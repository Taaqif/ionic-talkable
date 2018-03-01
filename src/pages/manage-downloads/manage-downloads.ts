import { Component, ChangeDetectorRef } from '@angular/core';
import {  NavController, NavParams, PopoverController } from 'ionic-angular';
import { DownloadService } from '../../providers/download-service/download-service';
import { ManageDownloadsPopoverPage } from "./manage-downloads-popover";

@Component({
  selector: 'page-manage-downloads',
  templateUrl: 'manage-downloads.html',
})
export class ManageDownloadsPage {
  interval: any;
  constructor(public cd: ChangeDetectorRef, public navCtrl: NavController, public navParams: NavParams, public downloadService:DownloadService,public popoverCtrl: PopoverController) {
    
  }
  ngOnInit(){
    let self = this;
    this.interval = setInterval( () => {
      this.cd.detectChanges();
    }, 1000);
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
  openMoreOptions(event){
    let popover = this.popoverCtrl.create(ManageDownloadsPopoverPage);
    popover.present({
      ev: event
    });
  }
}
