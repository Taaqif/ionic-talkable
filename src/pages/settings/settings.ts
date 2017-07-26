import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  unlockAllToggle: boolean;
  settings: any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private alertCtrl: AlertController, 
              private storage: Storage) {
    this.storage.get('settings').then((data) => {
      if(data == null){
        this.initializeSettings();
      }else{
        this.settings = data;
        // this.unlockAllToggle = this.settings.unlockAll;
      }
     
    })
  }
  doAlert() {
    let alert = this.alertCtrl.create({
      title: 'Feature being implemeted!',
      subTitle: 'Soon this feature will be implemented. Stay tuned!',
      buttons: ['Ok']
    });
    
    alert.present();
  }
  alertEventChange() {
    // this.alertEvent = this.alertEvent ? false : true;
    console.log(this.unlockAllToggle);
  }
  initializeSettings(){
    let init = {
      'unlockAll': false
    }
    this.settings = init;
    this.storage.set('settings', this.settings);
  }
  populateSettings(data){
    this.settings = data ;
    // .unlockAll = data.unlockAll;
    // this.storage.set('settings', )
  }
  updateSettings(){
    this.storage.set('settings', this.settings);
  }
  toggleUnlockAll() {
    // this.settings.unlockAll = this.;
    this.storage.set('settings', this.settings);
    // this.storage.get('unlockAll').then((data) => {
    //   console.log(data)
    // })
  }
  resetSettings(){
    let alert = this.alertCtrl.create({
      title: 'Reset Settings',
      subTitle: 'Do you wish to reset settings to default?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Reset',
          handler: () => {
            this.initializeSettings();
            //console.log('Buy clicked');
          }
        }
      ]
    });
  alert.present();
  }
}
