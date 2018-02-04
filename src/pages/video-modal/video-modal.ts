import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';


@Component({
  selector: 'page-video-modal',
  templateUrl: 'video-modal.html',
})
export class VideoModalPage {
  url;
  id;
  @ViewChild('video') video:ElementRef;
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.url = navParams.get('url');
    this.id = navParams.get('id');
    
  }
  ngAfterViewInit() {
    console.log(this.video); 
    if (this.video.nativeElement.requestFullscreen) {
      this.video.nativeElement.requestFullscreen();
    } else if (this.video.nativeElement.mozRequestFullScreen) {
      this.video.nativeElement.mozRequestFullScreen();
    } else if (this.video.nativeElement.webkitRequestFullscreen) {
      this.video.nativeElement.webkitRequestFullscreen();
    }
    this.video.nativeElement.play();
    //this.viewCtrl.dismiss();      //<<<=====same as oldest way
}

  

}
