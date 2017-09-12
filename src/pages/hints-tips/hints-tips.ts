import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-hints-tips',
  templateUrl: 'hints-tips.html'
})
export class HintsTipsPage {
  week: any = '';
  color: any = ''
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.week = this.navParams.get('w');
    this.color = this.week.number
  }
  
}
