import { Component } from '@angular/core';
import { NavController  } from 'ionic-angular';
import { FileServiceProvider } from "../../providers/file-service/file-service";
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';


@Component({
  selector: 'page-key-word-signs',
  templateUrl: 'key-word-signs.html'
})
export class KeyWordSignsPage {
  signs: any;
  signsChunks: any = [];
  filteredSigns: any = [];
  filteredSignsChunks: any = [];
  video: any;
  constructor(public navCtrl: NavController, public fs: FileServiceProvider, private streamingMedia: StreamingMedia) {
     // Show the loading message
    // let loadingPopup = this.loadingCtrl.create({
    //   content: 'Loading posts...'
    // });
    // loadingPopup.present();
    fs.getKeyWordSigns().subscribe((data) => {
      this.signs = data;
      this.createFilteredKeyWordArray();
      //this.filteredSigns = this.signs;
      
      // while (this.signs.length > 0){
      //   this.signsChunks.push(this.signs.splice(0, 2));
      // }
      // this.filteredSignsChunks = this.signsChunks;
      // loadingPopup.dismiss();
    });
    
    
    
  }
  playVideo(word){
    
    

    if (this.video.requestFullscreen) {
      this.video.requestFullscreen();
    } else if (this.video.mozRequestFullScreen) {
      this.video.mozRequestFullScreen();
    } else if (this.video.webkitRequestFullscreen) {
      this.video.webkitRequestFullscreen();
    }
    this.video.play();
    
    // let options: StreamingVideoOptions = {
    //   successCallback: () => { console.log('Video played') },
    //   errorCallback: (e) => { console.log(e + '\nError streaming') },
    //   orientation: 'landscape'
    // };

    // this.streamingMedia.playVideo('file:///android_asset/www/assets/b.mp4', options);
  }
  createFilteredKeyWordArray(){
    this.filteredSigns = []; 
    Object.keys(this.signs).forEach(key => {
      this.filteredSigns.push(key);
    });
  }
   filterItems(ev: any) {
    // this.filteredSigns = this.signs;
    this.createFilteredKeyWordArray();
    let val = ev.target.value;
    if (val && val.trim() !== '') {
      this.filteredSigns = this.filteredSigns.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
    }
    // if(!this.filteredSigns){
    //   return filte
    // }
  }
  ionViewDidLoad(){
    this.video = document.getElementById('vid');
    console.log(this.video)
  }
  
}
