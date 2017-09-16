import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Settings } from "../../providers/settings";
import { FileServiceProvider } from "../../providers/file-service/file-service";
import { AboutPage } from "../about/about";
import { AckPage } from "../ack/ack";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  unlockAllToggle: boolean;
  options: any;
  constructor(public navCtrl: NavController,
              public fs: FileServiceProvider, 
              public navParams: NavParams, 
              private alertCtrl: AlertController, 
              private settings: Settings) {
    this.settings.load().then(() => {
      this.options = this.settings.allSettings;
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
  updateSettings(){
    this.settings.setAll(this.options)
    // this.storage.set('settings', this.options);
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
            this.settings.reset().then(() => {
              this.options = this.settings.allSettings
              // this.options = val;
            });
            //console.log('Buy clicked');
          }
        }
      ]
    });
  alert.present();
  }
  goToAbout(){
    this.navCtrl.push(AboutPage); 
   }
   goToAck(){
    this.navCtrl.push(AckPage); 
   }
}
