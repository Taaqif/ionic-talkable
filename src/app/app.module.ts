import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Talkable } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
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
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TenWeekProgramPage } from '../pages/ten-week-program/ten-week-program';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { VideosPage } from '../pages/videos/videos'
import { FileServiceProvider } from '../providers/file-service/file-service';

@NgModule({
  declarations: [
    Talkable,
    HomePage,
    ListPage,
    Week1Page,
    Week2Page,
    Week3Page,
    Week4Page,
    Week5Page,
    Week6Page,
    Week7Page,
    Week8Page,
    Week9Page,
    Week10Page,
    TenWeekProgramPage,
    TabsControllerPage,
    VideosPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(Talkable),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Talkable,
    HomePage,
    ListPage,
    Week1Page,
    Week2Page,
    Week3Page,
    Week4Page,
    Week5Page,
    Week6Page,
    Week7Page,
    Week8Page,
    Week9Page,
    Week10Page,
    TenWeekProgramPage,
    TabsControllerPage,
    VideosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileServiceProvider
  ]
})
export class AppModule {}
