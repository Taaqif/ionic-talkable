import { Component, ViewChild } from '@angular/core';

import { MenuController, NavController, Slides, AlertController, Platform } from 'ionic-angular';
import * as moment from 'moment';

import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { TabsControllerPage } from '../tabs-controller/tabs-controller';

import { FileServiceProvider } from "../../providers/file-service/file-service";

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})

export class TutorialPage {
  showSkip = true;

  @ViewChild('slides') slides: Slides;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public menu: MenuController,
    public storage: Storage,
    public fs: FileServiceProvider,
    public alertCtrl: AlertController,
    private localNotifications: LocalNotifications
  ) { }

  startApp() {
    let started = moment();
    this.storage.set('startedOn', started.format('YYYY-MM-DD'));
    this.storage.set('currentWeek', 1);
    if (this.platform.is('cordova')) {

      this.localNotifications.hasPermission().then(permission => {
        if (!permission) {
          this.localNotifications.registerPermission().then(success => {
            if (success) {

              this.initializeNotifications(started);
            } else {
              let alert = this.alertCtrl.create({
                title: 'Notifications Disabled',
                subTitle: 'You will not receive notifications for weekly content',
                buttons: ['Ok']
              });
              alert.present();
            }
          })
        } else {
          this.initializeNotifications(started);
        }
      })
    }
    this.navCtrl.setRoot(TabsControllerPage, 1);
    this.fs.setActivePage('weeklyPage1');
    this.storage.set('hasSeenTutorial', 'true');
  }
  initializeNotifications(started: any) {
    //TODO: check notifications here
    this.storage.get("notificationsLoaded").then(notificationsLoaded => {
      if (!notificationsLoaded) {
        this.storage.get("currentWeek").then(currentWeek => {
          //set notificaitions here 
          for (let i = currentWeek; i <= 10 - currentWeek; i++) {
            // Schedule a single notification
            let futureDate = moment(started).add(i, 'weeks');
            futureDate.hour(9);
            futureDate.minute(0);
            //every week for 10 weeks 
            this.localNotifications.schedule({
              id: i + 1,
              title: 'New Weekly Content!',
              text: 'Week ' + i + 1 + ' is available. Check it out!',
              at: futureDate.toDate()
            });

          }
          this.storage.set("notificationsLoaded", true);
        })
      }
    })
  }
  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }

  ionViewWillEnter() {
    this.slides.update();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
