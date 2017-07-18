import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController  } from 'ionic-angular';
import { VideosPage } from '../videos/videos';
import { StoryTimePage } from '../story-time/story-time';
import { WeeklySignsPage } from '../weekly-signs/weekly-signs';
import { HintsTipsPage } from '../hints-tips/hints-tips';
import { FileServiceProvider } from '../../providers/file-service/file-service';


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
  
  constructor(public navCtrl: NavController,  public navParams: NavParams, public fs: FileServiceProvider, private loadingCtrl: LoadingController ) {
    // Show the loading message
    // let loadingPopup = this.loadingCtrl.create({
    //   content: 'Loading Content...'
    // });
    // loadingPopup.present();
    console.log(this.navParams.data)
    fs.getWeekContent(this.navParams.data).subscribe((data) => {
      this.week = data;
      // loadingPopup.dismiss();
      // this.navCtrl.setRoot(this.navCtrl.getActive().component);
    });
  }
  
}
