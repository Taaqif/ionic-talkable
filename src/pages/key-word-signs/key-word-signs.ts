import { Component } from '@angular/core';
import { NavController  } from 'ionic-angular';
import { FileServiceProvider } from "../../providers/file-service/file-service";
import { VideoService } from '../../providers/video-service/video-service';
import { DownloadService } from '../../providers/download-service/download-service';
// import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';


@Component({
  selector: 'page-key-word-signs',
  templateUrl: 'key-word-signs.html'
})
export class KeyWordSignsPage {
  signs: any;
  signsO: any = [];
  filteredSigns: any = [];
  filteredSignsChunks: any = [];
  video: any;
  constructor(public navCtrl: NavController, public fs: FileServiceProvider, public videoService: VideoService, public downloadService: DownloadService) {
     // Show the loading message
    // let loadingPopup = this.loadingCtrl.create({
    //   content: 'Loading posts...'
    // });
    // loadingPopup.present();
      this.signs = fs.getKeyWordSigns();
      this.signsO = fs.getKeyWordSigns();
      // this.createFilteredKeyWordArray();
      //this.filteredSigns = this.signs;
      
      // while (this.signs.length > 0){
      //   this.signsChunks.push(this.signs.splice(0, 2));
      // }
      // this.filteredSignsChunks = this.signsChunks;
      // loadingPopup.dismiss();
    
    
    
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
  createFilteredKeyWordArray(){
    this.filteredSigns = []; 
    Object.keys(this.signs).forEach(key => {
      this.filteredSigns.push(key);
    });
  }
   filterItems(ev: any) {
    this.signs = this.signsO;
    // this.createFilteredKeyWordArray();
    let val = ev.target.value;
    if (val && val.trim() !== '') {
      this.signs = this.signs.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
    }
    // if(!this.filteredSigns){
    //   return filte
    // }
  }
  ionViewDidLoad(){
    this.video = document.getElementById('vid');
  }
  
}
