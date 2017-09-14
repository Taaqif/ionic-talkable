import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { FileServiceProvider } from "../../providers/file-service/file-service";

@Component({
  selector: 'page-ten-week-program',
  templateUrl: 'ten-week-program.html'
})
export class TenWeekProgramPage {
  loaded: boolean = false;
  allWeeks:any = [];
  constructor(public navCtrl: NavController, public fs: FileServiceProvider) {
   
    for(let i = 0; i< 10; i++){
      this.fs.getWeekContent(i+1).subscribe((data) => {
        this.allWeeks.push(data);
      }) 
      if(i == 10){
        this.loaded = true;
      }
    }
  }
  goToWeeklyTabs(params){
    if (!params) params = {};
    this.navCtrl.push(TabsControllerPage, params);
    this.fs.setActivePage('weeklyPage'+ params);
  }
}
