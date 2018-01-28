import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage'
import { Device } from '@ionic-native/device';

@Injectable()

export class FeedbackService {
  feedbackURL: string = "http://feedback.talkable.org.au/new.php"
  constructor(public http: Http,public storage: Storage,private device: Device) {
    
  }
  submitFeedback(rating, message){
    var dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    let feedbackData = {
        time: new Date().toLocaleDateString('au-AU', dateOptions),
        rating: rating ? rating : 0,
        message: message,
        uuid: this.device.uuid,
        model: this.device.model,
        platform: this.device.platform,
        version: this.device.version
        
      }
      this.http.post(this.feedbackURL, JSON.stringify(feedbackData) ).subscribe(data => {
          console.log(data)
      })    
  }

}
