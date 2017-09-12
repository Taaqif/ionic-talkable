import { Component } from '@angular/core';
import { NavController, NavParams, AlertController  } from 'ionic-angular';
import { VideosPage } from '../videos/videos';
import { StoryTimePage } from '../story-time/story-time';
import { WeeklySignsPage } from '../weekly-signs/weekly-signs';
import { HintsTipsPage } from '../hints-tips/hints-tips';
import { FileServiceProvider } from '../../providers/file-service/file-service';
import { Storage } from '@ionic/storage';
import { Settings } from "../../providers/settings";
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
  canEnter: boolean;
  color: any='primary';
  constructor(public navCtrl: NavController,  
              public navParams: NavParams, 
              public fs: FileServiceProvider, 
              private storage: Storage,
              private alertCtrl: AlertController,
              private settings: Settings) {
                this.color = this.navParams.data;
                this.fs.getWeekContent(this.navParams.data).subscribe((data) => {
        this.week = data;
        // loadingPopup.dismiss();
        // this.navCtrl.setRoot(this.navCtrl.getActive().component);
      });
    
  }
  
  ionViewCanEnter(){
    let alert = this.alertCtrl.create({
      title: 'You have not unlocked this content yet!',
      subTitle: 'You are on week '+ this.fs.getCurrentWeek(),
      buttons: ['Ok']
    });
    return new Promise(resolve => {
      console.log(this.week)
      if(this.settings.getValue('unlockAll')){
        resolve(true);
        // return true;
      }else{
        this.storage.get('currentWeek').then((data) => {
          if(this.navParams.data > data){
            alert.present();
            resolve(false);
            // return false;
          }else{
            resolve(true);
            // return true;
            
            // this.navCtrl.setRoot(page.component, page.param);
            // this.activePage = page
          }
        }) 
      }     
      //let i = new Promise();
      //return Promise()
  })
  }
    
  
}
