import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Settings } from "../../providers/settings";
import { AcknowledgementsPage } from "../acknowledgements/acknowledgements";
import { AboutTalkablePage } from "../about-talkable/about-talkable";
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { RatingModal } from "../rating-modal/rating-modal";
import { SplashScreen } from '@ionic-native/splash-screen';
import { DownloadService } from "../../providers/download-service/download-service";
import { NotificationsService } from '../../providers/notifications-service/notifications-service';
import { ManageDownloadsPage } from "../manage-downloads/manage-downloads";
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
              public splashScreen: SplashScreen,
              public downloadService: DownloadService,
            public notificationsService: NotificationsService) {
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
  openAbout(){
    this.navCtrl.push(AboutTalkablePage);
  }
  openRatingModal(){
    let ratingModal = this.modalCtrl.create(RatingModal, null, {cssClass: 'ratingModal'});
   ratingModal.present();
  }
  updateSettings(){
    this.settings.setAll(this.options)
    // this.storage.set('settings', this.options);
  }
  openManageDownloads(){
    this.navCtrl.push(ManageDownloadsPage);
  }
  updateNotificationsPreference(){
    if(this.options && this.options.videoPreference == 'disabled'){
      this.notificationsService.disableNotifications();
    }else{
        this.notificationsService.initialiseNotifications();
    }
    this.settings.setAll(this.options);
  }

  updateVideoPreference(){
    if(this.options && this.options.videoPreference == 'download'){
      let alert = this.alertCtrl.create({
        title: 'Warning',
        message: 'This option will consume about 1GB of data, we suggest using a wifi network to download videos! <br><br>Videos will be downloaded in the background on a weekly basis. ',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.options.videoPreference = "online";
              this.settings.setAll(this.options).then(done=>{
                this.downloadService.stopDownloading();
              });
            }
          },
          {
            text: 'I Understand',
            cssClass: 'danger-label',
            handler: () => {
              this.settings.setAll(this.options).then(done => {
                this.downloadService.startDownloading();
              });
  
            }
          }
        ]
      });
      alert.present();
    }else{
      this.settings.setAll(this.options).then(done => {
        this.downloadService.stopDownloading();

      });
    }
    
    //show warinign popup before saving
    
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
          cssClass: 'danger-label',
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
          cssClass: 'danger-label',
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
