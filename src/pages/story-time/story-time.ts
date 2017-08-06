import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-story-time',
  templateUrl: 'story-time.html'
})
export class StoryTimePage {
  week: any = '';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.week = this.navParams.get('w');
  }
  
}
