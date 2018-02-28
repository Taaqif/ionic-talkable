import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,Platform  } from 'ionic-angular';
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
  push: boolean;
  constructor(public navCtrl: NavController,  
              public navParams: NavParams, 
              public fs: FileServiceProvider, 
              private storage: Storage,
              private alertCtrl: AlertController,
              private settings: Settings,
              private plt: Platform) {
                this.color = this.navParams.data.week;
        this.week = this.fs.getWeekContent(this.navParams.data.week);
        this.push = this.navParams.data.push
        
        // loadingPopup.dismiss();
        // this.navCtrl.setRoot(this.navCtrl.getActive().component);
    
  }
  
  ionViewCanEnter(){
    return new Promise(resolve => {
      if(this.settings.getValue('unlockAll')){
        resolve(true);
        // return true;
      }else{
        this.storage.get('currentWeek').then((data) => {
          if(this.navParams.data.week > data){
            let alert = this.alertCtrl.create({
              title: 'Locked content',
              message: 'Oops.. You have not unlocked this content yet. <br> You are on week ' + data ,
              buttons: ['Ok']
            });
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
