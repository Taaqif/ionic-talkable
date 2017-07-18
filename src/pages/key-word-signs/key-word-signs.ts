import { Component } from '@angular/core';
import { NavController,LoadingController  } from 'ionic-angular';
import { FileServiceProvider } from "../../providers/file-service/file-service";

@Component({
  selector: 'page-key-word-signs',
  templateUrl: 'key-word-signs.html'
})
export class KeyWordSignsPage {
  signs: any;
  filteredSigns: any;
  constructor(public navCtrl: NavController, public fs: FileServiceProvider, private loadingCtrl: LoadingController) {
     // Show the loading message
    // let loadingPopup = this.loadingCtrl.create({
    //   content: 'Loading posts...'
    // });
    // loadingPopup.present();
    fs.getKeyWordSigns().subscribe((data) => {
      this.signs = data;
      this.filteredSigns = this.signs;
      // loadingPopup.dismiss();
    });
  }
  
   filterItems(ev: any) {
    this.filteredSigns = this.signs;
    let val = ev.target.value;
    if (val && val.trim() !== '') {
      this.filteredSigns = this.filteredSigns.filter((item) => {
        return (item.word.toLowerCase().indexOf(val.toLowerCase()) > -1)
      });
    }
  }
  
}
