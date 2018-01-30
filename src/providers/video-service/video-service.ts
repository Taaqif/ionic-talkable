import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage'
import { Device } from '@ionic-native/device';

@Injectable()

export class VideoService {
  constructor(public http: Http,public storage: Storage,private device: Device) {
    
  }
  

}
