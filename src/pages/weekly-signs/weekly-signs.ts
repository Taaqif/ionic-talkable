import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FileServiceProvider } from '../../providers/file-service/file-service'

@Component({
  selector: 'page-weekly-signs',
  templateUrl: 'weekly-signs.html'
})
export class WeeklySignsPage {
  week: any = '';
  keyWordSignsChunks: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private fs: FileServiceProvider) {
    this.week = this.navParams.get('w');
    // this.keyWordSigns = this.week.weeklyKeyWordSigns;
    //split array into chunks of 2 
    
    // while (this.week.weeklyKeyWordSigns.length > 0){
    //   this.keyWordSignsChunks.push(this.week.weeklyKeyWordSigns.splice(0, 2));
    // }
    fs.getKeyWordSignObject(this.week.weeklyKeyWordSigns).subscribe(data => {
      while (data.length > 0){
        this.keyWordSignsChunks.push(data.splice(0, 2));
      }
    })

    // fs.getKeyWordSigns().subscribe((data) => {
    //   for (var index = 0; index < data.length; index++) {
    //     if(data[index].word === keyWord){
    //       return data[index];
    //     }
    //   }
    // })
  }
  
}
