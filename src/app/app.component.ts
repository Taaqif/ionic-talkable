import { Component, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';

import { HomePage } from '../pages/home/home';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { TenWeekProgramPage } from '../pages/ten-week-program/ten-week-program'
import { KeyWordSignsPage } from '../pages/key-word-signs/key-word-signs'
import { SettingsPage } from "../pages/settings/settings";
import { Storage } from '@ionic/storage';

export interface PageInterface {
  title: string;
  component: any;
  weekPage?: any
}
@Pipe({
  name: 'chunks'
})
export class ChunksPipe implements PipeTransform {
  transform(arr: any, chunkSize: number) {
    return arr.reduce((prev, cur, index) => (index % chunkSize) ? prev : prev.concat([arr.slice(index, index + chunkSize)]), []);
  }
}

@Component({
  templateUrl: 'app.html'
})


export class Talkable {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  activePage: any;
  // weeklyPages: PageInterface[] = [
  //   { title: 'Week 1', component: TabsControllerPage, weekPage: 1 }
  // ];
  
  pages: Array<{title: string, 
                component: any
                icon?: String}>;
  weeklyPages: Array<{title: string, 
                component: any,
                param?: any}>;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private storage: Storage, private alertCtrl: AlertController) {
    this.initializeApp();
    storage.set('currentWeek', 1);
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Key Word Signs', component: KeyWordSignsPage },
      { title: 'Word Tracker', component: KeyWordSignsPage },
      { title: 'Settings', component: SettingsPage, icon: "settings" }
    ];

    this.weeklyPages = [
      { title: 'Week 1', component: TabsControllerPage, param: 1 },
      { title: 'Week 2', component: TabsControllerPage, param: 2 },
      { title: 'Week 3', component: TabsControllerPage, param: 3 },
      { title: 'Week 4', component: TabsControllerPage, param: 4 },
      { title: 'Week 5', component: TabsControllerPage, param: 5 },
      { title: 'Week 6', component: TabsControllerPage, param: 6 },
      { title: 'Week 7', component: TabsControllerPage, param: 7 },
      { title: 'Week 8', component: TabsControllerPage, param: 8 },
      { title: 'Week 9', component: TabsControllerPage, param: 9 },
      { title: 'Week 10', component: TabsControllerPage, param: 10 },
    ];

    this.activePage = this.pages[0];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  initializeStorage(){
    
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let alert = this.alertCtrl.create({
      title: 'You have not unlocked this content yet!',
      subTitle: 'Focus on the current week :)',
      buttons: ['Ok']
    });

    if(page.param){
      this.storage.get('unlockAll').then((data) => {
        if(data == true){
          this.nav.setRoot(page.component, page.param);
          this.activePage = page
        }else{
          this.storage.get('currentWeek').then((data) => {
            if(page.param > data){
              alert.present();
            }else{
              this.nav.setRoot(page.component, page.param);
              this.activePage = page
            }
          }) 
        }     
    })
      
    }else{
      this.nav.setRoot(page.component);
      this.activePage = page
    }
  }
  
  
checkActive(page){
  return page == this.activePage;
}

}
