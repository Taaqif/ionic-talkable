import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TabsControllerPage } from "../tabs-controller/tabs-controller";
import { WordListPage } from "../word-list/word-list";
import { KeyWordSignsPage } from "../key-word-signs/key-word-signs";
import { FileServiceProvider } from "../../providers/file-service/file-service";
import { VideoService } from '../../providers/video-service/video-service';
import * as moment from 'moment'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

currentWeek;
savedwords = 0;
dayDiff;
constructor(public navCtrl: NavController, public videoService: VideoService, public storage: Storage, public fs: FileServiceProvider) {
  this.storage.get('currentWeek').then((data) => {
    this.currentWeek = data;
    this.storage.get('startedOn').then(date => {
      if (date) {
  
        let started = moment(date)
        let timediff = started.add(this.currentWeek, 'week');
        let now = moment();
        this.dayDiff = timediff.startOf('day').diff(now.startOf('day'), 'days')
      }
      })
  })
  this.fs.loadSavedWordList().then(data=> {
    this.savedwords = Object.keys(this.fs.getSavedWordList()).length;

  })
 
}


//Take the user to the week they are up to
userProgress(){
  //Set to Week1Page until user progress can be restored from saved data
    this.storage.get('currentWeek').then((data) => {
      let p ={week: data, push: false}
      this.navCtrl.setRoot(TabsControllerPage, p); 
      this.fs.setActivePage('weeklyPage'+data);
    })
 }
 gotToKeyWordSigns(){
  this.navCtrl.setRoot(KeyWordSignsPage); 
  this.fs.setActivePage('KeyWordSignsPage');
 }
 goToWordTracker(){
  this.navCtrl.setRoot(WordListPage); 
  this.fs.setActivePage('WordListPage');
 }


}




  
