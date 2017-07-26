import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SuperTabsModule } from 'ionic2-super-tabs';

import { Talkable } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ChunksPipe, ObjectPipe } from './app.component'

import { TenWeekProgramPage } from '../pages/ten-week-program/ten-week-program';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { VideosPage } from '../pages/videos/videos'
import { StoryTimePage } from '../pages/story-time/story-time'
import { HintsTipsPage } from '../pages/hints-tips/hints-tips'
import { WeeklySignsPage } from '../pages/weekly-signs/weekly-signs'
import { KeyWordSignsPage } from '../pages/key-word-signs/key-word-signs'
import { WordListPage } from "../pages/word-list/word-list";
import { SettingsPage } from "../pages/settings/settings";
import { FileServiceProvider } from '../providers/file-service/file-service';

@NgModule({
  declarations: [
    Talkable,
    HomePage,
    TenWeekProgramPage,
    TabsControllerPage,
    VideosPage,
    StoryTimePage,
    HintsTipsPage,
    KeyWordSignsPage,
    WordListPage,
    WeeklySignsPage,
    SettingsPage,
    ChunksPipe,
    ObjectPipe
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(Talkable),
    IonicStorageModule.forRoot(),
    SuperTabsModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Talkable,
    HomePage,
    TenWeekProgramPage,
    TabsControllerPage,
    VideosPage,
    StoryTimePage,
    HintsTipsPage,
    KeyWordSignsPage,
    WordListPage,
    WeeklySignsPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileServiceProvider
  ]
})
export class AppModule {}
