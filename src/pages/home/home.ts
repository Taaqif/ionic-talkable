import { NavController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {


constructor(public navCtrl: NavController, public storage: Storage) {}


//Take the user to the week they are up to
userProgress(){

  

  //Set to Week1Page until user progress can be restored from saved data
  this.storage.set('userProgress', 'Week1Page');

  this.storage.get('userProgress').then((data) => {
    console.log(data);
    this.navCtrl.push('',data);
    this.navCtrl.setRoot('',data); 
  })
 
  }



}




  
