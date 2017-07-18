import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-weekly-signs',
  templateUrl: 'weekly-signs.html'
})
export class WeeklySignsPage {
  week: any = '';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.week = this.navParams.get('w');
  }
  
}
