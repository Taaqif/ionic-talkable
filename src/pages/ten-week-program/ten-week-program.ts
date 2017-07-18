import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';

@Component({
  selector: 'page-ten-week-program',
  templateUrl: 'ten-week-program.html'
})
export class TenWeekProgramPage {

  constructor(public navCtrl: NavController) {
  }
  goToWeeklyTabs(params){
    if (!params) params = {};
    this.navCtrl.push(TabsControllerPage, params);
  }
}
