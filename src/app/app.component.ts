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
import { TenWeekProgramPage } from '../pages/ten-week-program/ten-week-program'
import { KeyWordSignsPage } from '../pages/key-word-signs/key-word-signs'

@Component({
  templateUrl: 'app.html'
})
export class Talkable {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  activePage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'TyeExperimentalWeeklyContent', component: TenWeekProgramPage },
      { title: 'Week 1', component: Week1Page },
      { title: 'Week 2', component: Week2Page },
      { title: 'Week 3', component: Week3Page },
      { title: 'Week 4', component: Week4Page },
      { title: 'Week 5', component: Week5Page },
      { title: 'Week 6', component: Week6Page },
      { title: 'Week 7', component: Week7Page },
      { title: 'Week 8', component: Week8Page },
      { title: 'Week 9', component: Week9Page },
      { title: 'Week 10', component: Week10Page },
      { title: 'Key Word Signs', component: KeyWordSignsPage }
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
    this.nav.setRoot(page.component);
    this.activePage = page;
  }
  
checkActive(page){
  return page == this.activePage;
}

}
