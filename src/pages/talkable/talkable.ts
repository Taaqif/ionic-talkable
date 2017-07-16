import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TenWeekProgramPage } from '../ten-week-program/ten-week-program';
import { VideosPage } from '../videos/videos';

@Component({
  selector: 'page-talkable',
  templateUrl: 'talkable.html'
})
export class TalkablePage {

  constructor(public navCtrl: NavController) {
  }
  goToTenWeekProgram(params){
    if (!params) params = {};
    this.navCtrl.push(TenWeekProgramPage);
  }goToVideos(params){
    if (!params) params = {};
    this.navCtrl.push(VideosPage);
  }
}
