import { Component, ViewChild } from '@angular/core';

import { MenuController, NavController, Slides, AlertController, Platform } from 'ionic-angular';
import * as moment from 'moment';

import { Storage } from '@ionic/storage';

import { TabsControllerPage } from '../tabs-controller/tabs-controller';

import { FileServiceProvider } from "../../providers/file-service/file-service";
import { NotificationsService } from '../../providers/notifications-service/notifications-service';
import { HomePage } from '../home/home';

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
    public notificationsService: NotificationsService
  ) { }

  startApp() {
    let started = moment();
    this.storage.set('startedOn', started.format('YYYY-MM-DD')).then(()=>{
      this.storage.set('currentWeek', 1).then(()=>{
            this.notificationsService.initialiseNotifications();
            this.navCtrl.setRoot(HomePage);
            this.fs.setActivePage('HomePage');
            this.storage.set('hasSeenTutorial', 'true');
      });

    });
    
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
