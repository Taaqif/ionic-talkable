import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Settings } from "../../providers/settings";
import{ ViewController}from 'ionic-angular';
@Component({
  selector: 'page-ack',
  templateUrl: 'ack.html',
})
export class AckPage {

  constructor(public navCtrl: NavController, 
    public viewCtrl: ViewController,
              public navParams: NavParams){}
              
              dismiss() {
                this.viewCtrl.dismiss();
              }
  }