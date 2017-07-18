import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-weekly-signs',
  templateUrl: 'weekly-signs.html'
})
export class WeeklySignsPage {
  week: any = '';
  keyWordSignsChunks: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.week = this.navParams.get('w');
    // this.keyWordSigns = this.week.weeklyKeyWordSigns;
    //split array into chunks of 2 
    while (this.week.weeklyKeyWordSigns.length > 0){
      this.keyWordSignsChunks.push(this.week.weeklyKeyWordSigns.splice(0, 2));
    }
  }
  
}
