import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SuperTabsModule } from 'ionic2-super-tabs';
import { IonicImageViewerModule } from 'ionic-img-viewer';

// import { StreamingMedia } from "@ionic-native/streaming-media";

import { Talkable } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ChunksPipe, ObjectPipe, KeysPipe } from './app.component'

import { TenWeekProgramPage } from '../pages/ten-week-program/ten-week-program';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { TutorialPage } from '../pages//tutorial/tutorial';
import { VideosPage } from '../pages/videos/videos'
import { StoryTimePage } from '../pages/story-time/story-time'
import { HintsTipsPage } from '../pages/hints-tips/hints-tips'
import { WeeklySignsPage } from '../pages/weekly-signs/weekly-signs'
import { KeyWordSignsPage } from '../pages/key-word-signs/key-word-signs'
import { WordListPage } from "../pages/word-list/word-list";
import { SettingsPage } from "../pages/settings/settings";
import { FileServiceProvider } from '../providers/file-service/file-service';
import { Settings } from "../providers/settings";

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    unlockAll: false
  });
}

@NgModule({
  declarations: [
    Talkable,
    HomePage,
    TenWeekProgramPage,
    TabsControllerPage,
    VideosPage,
    TutorialPage,
    StoryTimePage,
    HintsTipsPage,
    KeyWordSignsPage,
    WordListPage,
    WeeklySignsPage,
    SettingsPage,
    ChunksPipe,
    ObjectPipe,
    KeysPipe
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(Talkable,{
      platforms: {
        ios: {
          statusbarPadding: true
        }
      } 
    }),
    IonicStorageModule.forRoot(),
    SuperTabsModule.forRoot(),
    IonicImageViewerModule
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
    TutorialPage,
    KeyWordSignsPage,
    WordListPage,
    WeeklySignsPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileServiceProvider,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
  ]
})
export class AppModule {}
