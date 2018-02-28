import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-story-time',
  templateUrl: 'story-time.html'
})
export class StoryTimePage {
  week: any = '';
  color: any = '';
  push;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.week = this.navParams.get('w');
    this.push = this.navParams.get('push');
    this.color = this.week.number
  }
  goBack(){
    this.navCtrl.parent.viewCtrl.dismiss();
  }
}
