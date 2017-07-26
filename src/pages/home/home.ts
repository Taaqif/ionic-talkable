import { NavController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TabsControllerPage } from "../tabs-controller/tabs-controller";
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
    this.navCtrl.setRoot(TabsControllerPage, data); 
    this.fs.setActivePage('weeklyPage'+data);
  })
 
  }



}




  
