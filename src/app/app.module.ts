import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SuperTabsModule } from 'ionic2-super-tabs';
import { DownloadService } from "../providers/download-service/download-service";
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Ionic2RatingModule } from 'ionic2-rating';
import { Device } from '@ionic-native/device';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Talkable } from './app.component';
import { HomePage } from '../pages/home/home';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { AboutTalkablePage } from "../pages/about-talkable/about-talkable";
import { ChunksPipe, ObjectPipe, KeysPipe } from './app.component'

import { AcknowledgementsPage } from '../pages/acknowledgements/acknowledgements';
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
import { FeedbackService } from "../providers/feedback-service/feedback-service";
import { VideoService } from "../providers/video-service/video-service";
import { Settings } from "../providers/settings";
import { RatingModal } from "../pages/rating-modal/rating-modal";
import { NotificationsService } from '../providers/notifications-service/notifications-service';
import { ManageDownloadsPage } from "../pages/manage-downloads/manage-downloads";
import { Network } from '@ionic-native/network';
import { ManageDownloadsPopoverPage } from '../pages/manage-downloads/manage-downloads-popover';
import { ProgressBarModule } from "ngx-progress-bar";

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    unlockAll: false,
    videoPreference: 'online',
    notifications: "enabled"
  });
}

@NgModule({
  declarations: [
    Talkable,
    HomePage,
    TenWeekProgramPage,
    AcknowledgementsPage,
    TabsControllerPage,
    VideosPage,
    TutorialPage,
    StoryTimePage,
    HintsTipsPage,
    KeyWordSignsPage,
    WordListPage,
    WeeklySignsPage,
    SettingsPage,
    RatingModal,
    ManageDownloadsPage,
    ManageDownloadsPopoverPage,
    AboutTalkablePage,
    ChunksPipe,
    ObjectPipe,
    KeysPipe
  ],
  imports: [
    HttpModule,
    BrowserModule,
    ProgressBarModule,
    IonicModule.forRoot(Talkable,{
      platforms: {
        ios: {
          statusbarPadding: true
        }
      } 
    }),
    Ionic2RatingModule,
    IonicStorageModule.forRoot(),
    SuperTabsModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Talkable,
    HomePage,
    TenWeekProgramPage,
    TabsControllerPage,
    AboutTalkablePage,
    VideosPage,
    AcknowledgementsPage,
    StoryTimePage,
    ManageDownloadsPage,
    ManageDownloadsPopoverPage,
    HintsTipsPage,
    TutorialPage,
    KeyWordSignsPage,
    RatingModal,
    WordListPage,
    WeeklySignsPage,
    SettingsPage
  ],
  providers: [
    SplashScreen,
    VideoService,
    Device,
    LocalNotifications,
    SocialSharing,
    StreamingMedia,
    BackgroundMode,
    DownloadService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileServiceProvider,
    FeedbackService,
    FileTransfer,
    FileTransferObject,
    Network,
    NotificationsService,
    File,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
  ]
})
export class AppModule {}
