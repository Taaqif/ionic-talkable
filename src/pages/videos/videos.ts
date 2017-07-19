import { Component } from '@angular/core';
import { NavController, NavParams  } from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html'
})
export class VideosPage {
  week: any = '';
  constructor(public navCtrl: NavController,  public navParams: NavParams, private streamingMedia: StreamingMedia) {
    // console.log(JSON.stringify(this.navParams.data));
    console.log(this.navParams.data);
    this.week = this.navParams.get('w');
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape'
    };

    this.streamingMedia.playVideo('assets/vid/sample.mp4', options);
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
  
}
