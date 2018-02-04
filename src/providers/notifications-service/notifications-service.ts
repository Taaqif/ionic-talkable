import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { Settings } from "../../providers/settings";
import { Platform } from 'ionic-angular';
import { FileServiceProvider } from '../file-service/file-service';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment'
@Injectable()

export class NotificationsService {

    constructor(
        public platform: Platform,
        private settings: Settings,
        private localNotifications: LocalNotifications,
        public storage: Storage,
        public fs: FileServiceProvider,
        public alertCtrl: AlertController, ) {

    }
    initialiseNotifications() {
        let self = this
        this.storage.get('startedOn').then(date => {
            if (date) {
                this.localNotifications.getAllScheduled().then(s => {
                    console.log(s)
                })                
                let started = moment(date)
                this.storage.get("notificationsLoaded").then(notificationsLoaded => {

                    if (!notificationsLoaded) {
                        self.localNotifications.hasPermission().then(permission => {

                            if (!permission) {
                                self.localNotifications.registerPermission().then(success => {
                                    if (success) {
                                        self.generateNotifications(started);
                                    } else {
                                        let alert = self.alertCtrl.create({
                                            title: 'Notifications Disabled',
                                            subTitle: 'You will not receive notifications about weekly content',
                                            buttons: ['Ok']
                                        });
                                        alert.present();
                                        this.storage.set("notificationsLoaded", true);

                                    }
                                })
                            } else {
                                self.generateNotifications(started);
                            }
                        })

                    }

                })
            }
        })
    }
    disableNotifications() {
        this.storage.set("notificationsLoaded", false).then(()=>{
            this.localNotifications.cancelAll();

        })
    }

    generateNotifications(started) {
        //TODO: check notifications here

        this.storage.get("currentWeek").then(currentWeek => {
            //set notificaitions here 
            for (let i = currentWeek; i <= 10 - currentWeek; i++) {
                // Schedule a single notification
                let futureDate = moment(started).add(i, 'weeks');
                futureDate.hour(9);
                futureDate.minute(0);
                //every week for 10 weeks 
                this.localNotifications.schedule({
                    id: i + 1,
                    title: 'New Weekly Content!',
                    text: 'Week ' + (i + 1) + ' is available. Check it out!',
                    at: futureDate.toDate()
                });

            }
            this.storage.set("notificationsLoaded", true);
        })
    }

}
