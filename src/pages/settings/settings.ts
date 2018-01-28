import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Settings } from "../../providers/settings";
import { AcknowledgementsPage } from "../acknowledgements/acknowledgements";
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { RatingModal } from "../rating-modal/rating-modal";
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  unlockAllToggle: boolean;
  options: any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private alertCtrl: AlertController, 
              private settings: Settings,
              public storage: Storage,
              private localNotifications: LocalNotifications,
              public modalCtrl: ModalController,
              public splashScreen: SplashScreen) {
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
  openAcknowledgements(){
    this.navCtrl.push(AcknowledgementsPage);
  }
  openRatingModal(){
    let ratingModal = this.modalCtrl.create(RatingModal, null, {cssClass: 'ratingModal'});
   ratingModal.present();
  }
  updateSettings(){
    this.settings.setAll(this.options)
    // this.storage.set('settings', this.options);
  }
  resetProgress(){
    let alert = this.alertCtrl.create({
      title: 'Reset Progress',
      subTitle: 'Do you wish to reset everything to default? WARNING: This will reset to app defaults',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Reset Progress',
          handler: () => {
            this.settings.reset().then(() => {
              this.options = this.settings.allSettings
              this.storage.clear();
              this.localNotifications.cancelAll();
              this.splashScreen.show();
              document.location.href = 'index.html';

              // this.options = val;
            });
            //console.log('Buy clicked');
          }
        }
      ]
    });
  alert.present();
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
}
