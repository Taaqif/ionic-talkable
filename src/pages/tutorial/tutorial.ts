import { Component, ViewChild } from '@angular/core';

import { MenuController, NavController, Slides } from 'ionic-angular';

import { Storage } from '@ionic/storage';

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
    public navCtrl: NavController,
    public menu: MenuController,
    public storage: Storage,
    public fs: FileServiceProvider
  ) { }

  startApp() {
    this.storage.set('started on', new Date().toDateString());
    this.storage.set('currentWeek', 1);
    
    this.navCtrl.setRoot(TabsControllerPage, 1); 
    this.fs.setActivePage('weeklyPage1');
    this.storage.set('hasSeenTutorial', 'true');
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
