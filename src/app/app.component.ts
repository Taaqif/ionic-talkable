import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';
import { ListPage } from '../pages/list/list';
import { HomePage } from '../pages/home/home';
import { Week1Page } from '../pages/week1/week1';
import { Week2Page } from '../pages/week2/week2';
import { Week3Page } from '../pages/week3/week3';
import { Week4Page } from '../pages/week4/week4';
import { Week5Page } from '../pages/week5/week5';
import { Week6Page } from '../pages/week6/week6';
import { Week7Page } from '../pages/week7/week7';
import { Week8Page } from '../pages/week8/week8';
import { Week9Page } from '../pages/week9/week9';
import { Week10Page } from '../pages/week10/week10';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { TenWeekProgramPage } from '../pages/ten-week-program/ten-week-program'
import { KeyWordSignsPage } from '../pages/key-word-signs/key-word-signs'
export interface PageInterface {
  title: string;
  component: any;
  weekPage?: any
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
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Key Word Signs', component: KeyWordSignsPage },
      { title: 'Word Tracker', component: KeyWordSignsPage },
      { title: 'Settings', component: KeyWordSignsPage, icon: "settings" }
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

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    

    if(page.param){
      this.nav.setRoot(page.component, page.param);
      this.activePage = page
    }else{
      this.nav.setRoot(page.component);
      this.activePage = page
    }
  }
  
  
checkActive(page){
  return page == this.activePage;
}

}
