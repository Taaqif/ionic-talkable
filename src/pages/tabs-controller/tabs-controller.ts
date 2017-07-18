import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VideosPage } from '../videos/videos';
import { StoryTimePage } from '../story-time/story-time';
import { WeeklySignsPage } from '../weekly-signs/weekly-signs';
import { HintsTipsPage } from '../hints-tips/hints-tips';
import { FileServiceProvider } from '../../providers/file-service/file-service';

import { Http } from '@angular/http';


@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  week: any;
  videoTabRoot: any = VideosPage;
  storyTabRoot: any = StoryTimePage;
  weeklySignsTabRoot: any = WeeklySignsPage;
  hintsTipsTabRoot: any = HintsTipsPage;
  
  constructor(public navCtrl: NavController,  public navParams: NavParams, public fs: FileServiceProvider) {

    fs.getWeekContent(this.navParams.data).subscribe((data) => {
      this.week = data;
      // this.navCtrl.setRoot(this.navCtrl.getActive().component);
    });
  }
  
}
