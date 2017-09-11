import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TabsControllerPage } from "../tabs-controller/tabs-controller";
import { WordListPage } from "../word-list/word-list";
import { KeyWordSignsPage } from "../key-word-signs/key-word-signs";
import { FileServiceProvider } from "../../providers/file-service/file-service";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {


constructor(public navCtrl: NavController, public storage: Storage, public fs: FileServiceProvider) {}


//Take the user to the week they are up to
userProgress(){
  //Set to Week1Page until user progress can be restored from saved data
    this.storage.get('currentWeek').then((data) => {
      console.log(data)
      this.navCtrl.setRoot(TabsControllerPage, data); 
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




  
