import { Component } from '@angular/core';
import { ViewController, AlertController } from 'ionic-angular';
import { FileServiceProvider } from "../../providers/file-service/file-service";
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-rating-modal',
  templateUrl: 'rating-modal.html'
})
export class RatingModal {
  rating: any;
  feedback: any;
  constructor(public viewCtrl: ViewController, public alertCtrl: AlertController, public fs: FileServiceProvider, public storage: Storage,) {
    this.storage.get("feedback").then(feedback => {
      if(feedback){
        this.rating = feedback.rating;
        this.feedback = feedback.feedback;
      }
    })
    
    
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  submitFeedback(){
    this.storage.set('feedback', {'rating': this.rating, 'feedback': this.feedback ? this.feedback.trim() : ''})
    if(this.rating > 0 || this.feedback){
      let alert = this.alertCtrl.create({
        title: 'Feedback submitted!',
        subTitle: 'Thanks for your contribution' ,
        buttons: ['Ok!']
      });
      alert.present();

    }
    
    this.dismiss();
    
  }
}
