import { Component, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { Nav, Platform, MenuController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as moment from 'moment';
import { HomePage } from '../pages/home/home';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { TenWeekProgramPage } from '../pages/ten-week-program/ten-week-program'
import { KeyWordSignsPage } from '../pages/key-word-signs/key-word-signs'
import { WordListPage } from "../pages/word-list/word-list";
import { SettingsPage } from "../pages/settings/settings";
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { FileServiceProvider } from "../providers/file-service/file-service";
import { Settings } from "../providers/settings";
export interface PageInterface {
  title: string;
  component: any;
  weekPage?: any;

}
@Pipe({
  name: 'chunks'
})
export class ChunksPipe implements PipeTransform {
  transform(arr: any, chunkSize: number) {
    return arr.reduce((prev, cur, index) => (index % chunkSize) ? prev : prev.concat([arr.slice(index, index + chunkSize)]), []);
  }
}
@Pipe({
  name: 'object'
})
export class ObjectPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.keys(value).map(key => Object.assign({ key }, value[key]));
  }
}
@Pipe({ name: 'keys', pure: false })
export class KeysPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.keys(value)//.map(key => value[key]);
  }
}
@Component({
  templateUrl: 'app.html'
})


export class Talkable {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  activePage: any;
  pageReady: boolean = false;
  // weeklyPages: PageInterface[] = [
  //   { title: 'Week 1', component: TabsControllerPage, weekPage: 1 }
  // ];

  programPages: Array<{
    id: string,
    title: string,
    component: any
    icon?: String,
    param?: any
  }>;
  wordPages: Array<{
    id: string,
    title: string,
    component: any
    icon?: String
  }>;
  settingsPages: Array<{
    id: string,
    title: string,
    component: any
    icon?: String
  }>;
  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storage: Storage,
    public fs: FileServiceProvider,
    public menuCtrl: MenuController,
    public settings: Settings,
    public alertCtrl: AlertController,
    private localNotifications: LocalNotifications) {
    // Check if the user has already seen the tutorial

    this.storage.get('startedOn').then(date => {
      if (date) {

        let started = moment(date)
        this.localNotifications.hasPermission().then(permission => {
          if(!permission){
            this.localNotifications.registerPermission().then(success => {
              if(success){
        
                this.initializeNotifications(started);
              }else{
                let alert = this.alertCtrl.create({
                  title: 'Notifications Disabled',
                  subTitle: 'You will not receive notifications about weekly content',
                  buttons: ['Ok']
                });
                alert.present();
              }
            })
          }else{
            
            this.initializeNotifications(started);
          }
        })
        

        let now = moment();
        let timediff = now.diff(started, 'week') + 1
        //multiple of 7 (aka a week)
        if (timediff > 0) {
          storage.get('currentWeek').then(currentWeek => {
            console.log(currentWeek)
            if (parseInt(currentWeek) <= 10 && timediff > parseInt(currentWeek)) {
              if (timediff > 10) {
                timediff = 10;
              }
              
              this.storage.set('currentWeek', timediff);
              this.localNotifications.cancel(timediff);
              let alert = this.alertCtrl.create({
                title: 'New Content',
                subTitle: 'New weekly content has been unlocked!<br>You are now on week ' + timediff,
                buttons: ['Awesome!']
              });
              alert.present();
            }
          });
        }
      }

    })
    this.storage.get('currentWeek').then((data) => {
      if (data) {
        this.programPages[0].param = data;
        if (data > 10) {
          this.storage.set('currentWeek', 10);
          this.programPages[0].param = 10;
        }
      }

    })
    // used for an example of ngFor and navigation
    this.programPages = [
      { id: 'CurrentWeekPage', title: 'Current Week', component: TabsControllerPage, icon: "talkable-current", param: 1 },
      { id: 'TenWeekProgramPage', title: 'Entire Program', component: TenWeekProgramPage, icon: "talkable-overview" },
    ];
    this.wordPages = [
      { id: 'KeyWordSignsPage', title: 'Key Word Signs', component: KeyWordSignsPage, icon: "talkable-key" },
      { id: "WordListPage", title: 'Word Tracker', component: WordListPage, icon: "talkable-word-tracker" },
      // { id: "WordListPage", title: 'Word Tracker', component: WordListPage, icon: "ios-clipboard-outline" },
    ];
    this.settingsPages = [
      { id: "SettingsPage", title: 'Settings', component: SettingsPage, icon: "talkable-settings" }
    ];
    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = TutorialPage;
        }
        this.initializeApp();
      });
    // this.weeklyPages = [
    //   { id: 'weeklyPage1', title: 'Week 1', component: TabsControllerPage, param: 1 },
    //   { id: 'weeklyPage2', title: 'Week 2', component: TabsControllerPage, param: 2 },
    //   { id: 'weeklyPage3', title: 'Week 3', component: TabsControllerPage, param: 3 },
    //   { id: 'weeklyPage4', title: 'Week 4', component: TabsControllerPage, param: 4 },
    //   { id: 'weeklyPage5', title: 'Week 5', component: TabsControllerPage, param: 5 },
    //   { id: 'weeklyPage6', title: 'Week 6', component: TabsControllerPage, param: 6 },
    //   { id: 'weeklyPage7', title: 'Week 7', component: TabsControllerPage, param: 7 },
    //   { id: 'weeklyPage8', title: 'Week 8', component: TabsControllerPage, param: 8 },
    //   { id: 'weeklyPage9', title: 'Week 9', component: TabsControllerPage, param: 9 },
    //   { id: 'weeklyPage10', title: 'Week 10', component: TabsControllerPage, param: 10 },
    // ];
    // this.fs.setActivePage(this.pages[0].id);
    this.activePage = this.programPages[0];
  }
  initializeNotifications(started:any){
    //TODO: check notifications here
    this.storage.get("notificationsLoaded").then(notificationsLoaded => {
      if(!notificationsLoaded){
        this.storage.get("currentWeek").then(currentWeek => {
          //set notificaitions here 
          for (let i = currentWeek; i <= 10 - currentWeek; i++) {
            // Schedule a single notification
            let futureDate = moment(started).add(i, 'weeks');
            futureDate.hour(9);
            futureDate.minute(0);
            //every week for 10 weeks 
            this.localNotifications.schedule({
              id: i+1,
              title: 'New Weekly Content!',
              text: 'Week ' + i +1 + ' is available. Check it out!',
              at: futureDate.toDate()
            });
            this.storage.set("notificationsLoaded", true);
          }
        })
      }
    })
  }
  initializeApp() {
    this.settings.load().then(() => {
      this.pageReady = true;
    });
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.platform.registerBackButtonAction(() => {
        if (this.nav.canGoBack()) {
          this.nav.pop();
        } else {
          if (this.nav.getActive().component == this.programPages[0].component) {
            this.platform.exitApp();
          } else {
            this.nav.setRoot(this.programPages[0].component, this.programPages[0].param);
            this.fs.setActivePage(this.programPages[0].id);
          }

        }
      });

    });
  }
  openPage(page) {
    this.menuCtrl.close();
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.id != this.fs.getActivePage()) {

      this.nav.setRoot(page.component, page.param);
      this.fs.setActivePage(page.id);

      // if(page.param){

      //   this.nav.setRoot(page.component, page.param).then(success => {
      //       if(success){

      //         this.fs.setActivePage(page.id);
      //         this.menuCtrl.close();
      //         this.activePage = page
      //       }       
      //   });

      // }else{
      //   this.menuCtrl.close();
      //   this.nav.setRoot(page.component);
      //   this.fs.setActivePage(page.id);

      //   // this.fs.setActivePage(page.id);
      //   // this.activePage = page
      // }
    } else {
      // this.menuCtrl.close();
    }


  }


  checkActive(page) {
    return page.id == this.fs.getActivePage();
    // return page == this.activePage;
  }

  checkCurrentWeek(page) {
    return page.param == this.fs.getCurrentWeek();
    // return page == this.activePage;
  }

  checkAvailable(page) {
    // return true;
    if (this.settings.getValue('unlockAll')) {
      return true;
    } else {
      if (page.param > this.fs.getCurrentWeek()) {
        return false;
      } else {
        return true;
      }

    }
    // return new Promise(resolve => {
    //   if(this.fs.settings['unlockAll']){
    //     resolve(true);
    //   }else{
    //     if(page > this.fs.currentWeek){
    //       resolve(false);
    //     }else{
    //       resolve(true);
    //     }
    //   }
    // })
  }

}
