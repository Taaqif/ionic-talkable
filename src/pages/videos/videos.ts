import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
  host: {
    '(document:webkitfullscreenchange)': 'onFullscreen($event)'
  }
})
export class VideosPage {
  week: any = '';
  color: any = ''
  watchedVideos: any[] = [];
  constructor(public navCtrl: NavController,  
              public navParams: NavParams,
              public storage: Storage) {
    // console.log(JSON.stringify(this.navParams.data));
    this.week = this.navParams.get('w');
    this.color = this.week.number;
    // this.storage.set('watchedVideos', '');
    this.storage.get('watchedVideos').then(data => {
      console.log(this.watchedVideos)
        this.watchedVideos = data;
      });

    // this.streamingMedia.playVideo('assets/vid/sample.mp4', options);
    // fs.getData('../../assets/data/week'+this.navParams.data+'.json').subscribe((data) => {
    //   this.week = data;
    //   // this.navCtrl.setRoot(this.navCtrl.getActive().component);
    // });
    // fs.getData('../../assets/data/week1.json').subscribe((data) => {
    //   this.week = data;
    //   console.log(this.week);
    //   // this.navCtrl.setRoot(this.navCtrl.getActive().component);
    // });
    // console.log(fs.data);
    // this.week = this.navParams.data;
    // console.log(this.week);
  }
  playVideo(id){
    let video:any;
    video = document.getElementById(id);
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
    video.play();
  }
  onFullscreen(e) {
    //TODO: Handle tab bar overlay
    // let tabbar:any;
    // tabbar = document.getElementsByClassName('tabbar')[0];
    // if (tabbar.style.visibility === 'hidden') {
    //     tabbar.style.visibility = 'visible';
    // } else {
    //     tabbar.style.visibility = 'hidden';
    // }
    //alert('Fullscreen ')
  }
  watched(video, event){
    let watchedVideos;
    event.target.webkitExitFullScreen();
    this.storage.get('watchedVideos').then(data => {
      if(data){
        watchedVideos = data;
        if(!watchedVideos.includes(video.id)){
          watchedVideos.push(video.id);
          this.setWatchedVideos(watchedVideos);
          // this.storage.set('watchedVideos', watchedVideos)
        }  
      }else{
        watchedVideos = [video.id];
        this.setWatchedVideos(watchedVideos);
        // this.storage.set('watchedVideos', watchedVideos)
      }
    })
  }
  setWatchedVideos(videos){
    this.storage.set('watchedVideos', videos).then(data => {
      this.watchedVideos = data;
    })
  }
  // checkWatchedVideo(video){
  //   return new Promise(resolve => {
  //     this.storage.get('watchedVideos').then(data => {
  //       if(data.includes(video.id)){
  //         console.log(data)
  //         resolve(true);
  //       }else{
  //         resolve(false);
  //       }
  //     });
  //   })
  // }
  
}
