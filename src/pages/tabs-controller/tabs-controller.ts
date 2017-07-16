import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VideosPage } from '../videos/videos';
import { StoryTimePage } from '../story-time/story-time';
import { KeyWordSignsPage } from '../key-word-signs/key-word-signs';
import { HintsTipsPage } from '../hints-tips/hints-tips';
import { FileServiceProvider } from '../../providers/file-service/file-service';

import { Http } from '@angular/http';


@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  week: any;
  tab1Root: any = VideosPage;
  tab2Root: any = StoryTimePage;
  tab3Root: any = KeyWordSignsPage;
  tab4Root: any = HintsTipsPage;
  constructor(public navCtrl: NavController,  public navParams: NavParams, public fs: FileServiceProvider) {
    // this.week = this.navParams.data;
    // this.week = this.navParams.data;
    fs.getData('../../assets/data/week'+this.navParams.data+'.json').subscribe((data) => {
      this.week = data;
      // this.navCtrl.setRoot(this.navCtrl.getActive().component);
    });
    // console.log(this.navParams.data);
  }
  
}
