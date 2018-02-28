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
  allWeeks:any = new Array(10);
  constructor(public navCtrl: NavController, public fs: FileServiceProvider) {
    this.allWeeks = this.fs.getAllWeeks()

    // for(let i = 1; i<=10; i++){
    //   this.allWeeks = this.fs.getAllWeeks()
    //   this.fs.getWeekContent(i).subscribe((data) => {
    //     this.allWeeks[data.number - 1] = data;
        
    //     if(i == this.allWeeks.length){
    //       this.loaded = true;
    //       console.log(this.allWeeks)
    //     }
    //   }) 
      
    // }
  }
  goToWeeklyTabs(params){
    if (!params) params = {};
    let p = {week: params, push: true}
    this.navCtrl.push(TabsControllerPage, p);
    this.fs.setActivePage('weeklyPage'+ params);
  }
}
