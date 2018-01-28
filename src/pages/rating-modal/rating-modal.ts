import { Component } from '@angular/core';
import { NavController  } from 'ionic-angular';
import { FileServiceProvider } from "../../providers/file-service/file-service";
// import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';


@Component({
  selector: 'page-rating-modal',
  templateUrl: 'rating-modal.html'
})
export class RatingModal {
  rate: any;
  constructor(public navCtrl: NavController, public fs: FileServiceProvider) {
    
    
    
  }
}
