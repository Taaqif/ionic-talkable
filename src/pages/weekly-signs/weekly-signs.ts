import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VideoService } from '../../providers/video-service/video-service';
import { DownloadService } from '../../providers/download-service/download-service';

@Component({
  selector: 'page-weekly-signs',
  templateUrl: 'weekly-signs.html'
})
export class WeeklySignsPage {
  week: any = '';
  keyWordSignsChunks: any = [];
  weeklyKeyWordSigns: any = [];
  color: any = '';
  push;
  constructor(public navCtrl: NavController, public navParams: NavParams, public videoService: VideoService, public downloadService: DownloadService) {
    this.week = this.navParams.get('w');
    this.push = this.navParams.get('push');
    this.color = this.week.number;
    this.weeklyKeyWordSigns = this.week.weeklyKeyWordSigns;
    //split array into chunks of 2 
    // while (this.week.weeklyKeyWordSigns.length > 0){
    //   // this.keyWordSignsChunks.push(this.week.weeklyKeyWordSigns.splice(0, 2));
    //   this.weeklyKeyWordSigns.push(this.week.weeklyKeyWordSigns);
    // }
    // fs.getKeyWordSignObject(this.week.weeklyKeyWordSigns).subscribe(data => {
    //   while (data.length > 0){
    //     this.keyWordSignsChunks.push(data.splice(0, 2));
    //   }
    // })

    // fs.getKeyWordSigns().subscribe((data) => {
    //   for (var index = 0; index < data.length; index++) {
    //     if(data[index].word === keyWord){
    //       return data[index];
    //     }
    //   }
    // })
  }
  goBack(){
    this.navCtrl.parent.viewCtrl.dismiss();
  }
  playVideo(id){
    this.videoService.playVideo(id);
    // let video:any;
    // video = document.getElementById(id);
    // if (video.requestFullscreen) {
    //   video.requestFullscreen();
    // } else if (video.mozRequestFullScreen) {
    //   video.mozRequestFullScreen();
    // } else if (video.webkitRequestFullscreen) {
    //   video.webkitRequestFullscreen();
    // }
    // video.play();
  }
 watched(video, event){
    event.target.webkitExitFullScreen();
  }
  
}
