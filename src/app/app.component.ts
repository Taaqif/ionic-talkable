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
import { NotificationsService } from '../providers/notifications-service/notifications-service';
import { DownloadService } from '../providers/download-service/download-service';
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
    private localNotifications: LocalNotifications,
  public notificationsService: NotificationsService,
  public downloadService: DownloadService) {
    // Check if the user has already seen the tutorial
    this.storage.get('startedOn').then(date => {
      if (date) {

        let started = moment(date)
        

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
                message: '<p>New weekly content has been unlocked!</p><p>You are now on week <strong>' + timediff + '</strong></p>',
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
      { id: 'HomePage', title: 'Home', component: HomePage, icon: "md-home"},
      { id: 'CurrentWeekPage', title: 'Current Week', component: TabsControllerPage, icon: "talkable-current", param: 1 },
      { id: 'TenWeekProgramPage', title: 'Entire Program', component: TenWeekProgramPage, icon: "talkable-overview" },
    ];
    this.wordPages = [
      { id: 'KeyWordSignsPage', title: 'Key Word Signs', component: KeyWordSignsPage, icon: "talkable-key-word-signs" },
      { id: "WordListPage", title: 'Word Tracker', component: WordListPage, icon: "talkable-word-tracker" },
      // { id: "WordListPage", title: 'Word Tracker', component: WordListPage, icon: "ios-clipboard-outline" },
    ];
    this.settingsPages = [
      { id: "SettingsPage", title: 'Settings', component: SettingsPage, icon: "settings" }
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
    
    this.activePage = this.programPages[0];
  }
  
  initializeApp() {
    this.settings.load().then(() => {
      this.pageReady = true;
    });
    this.platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.notificationsService.initialiseNotifications();
      this.downloadService.startDownloading();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.platform.registerBackButtonAction(() => {
        if (this.nav.canGoBack()) {
          this.nav.pop();
        } else {
          if (this.nav.getActive().component == HomePage) {
            this.platform.exitApp();
          } else {
            this.nav.setRoot(HomePage);
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
      this.nav.setRoot(page.component, {week: page.param, push: false});
      this.fs.setActivePage(page.id);

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

  }

}
