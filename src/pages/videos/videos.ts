import { Component } from '@angular/core';
import { NavController, NavParams  } from 'ionic-angular';

@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html'
})
export class VideosPage {
  week: any = '';
  constructor(public navCtrl: NavController,  public navParams: NavParams) {
    // console.log(JSON.stringify(this.navParams.data));
    console.log(this.navParams.data);
    this.week = this.navParams.get('w');
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
