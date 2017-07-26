import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FileServiceProvider } from "../../providers/file-service/file-service";
@Component({
  selector: 'page-word-list',
  templateUrl: 'word-list.html',
})
export class WordListPage {
  wordList: any;
  filteredWordList: any[] = [];
  WordListO: any;
  constructor(public navCtrl: NavController,  
              public navParams: NavParams, 
              public fs: FileServiceProvider,
              public alertCtrl: AlertController) {
      this.fs.getWordList().subscribe(data => {
        this.wordList = data;
        this.WordListO = data;
        // array.forEach(element => {
          // this.resetFilteredWordList();
        // });
        
      })
  }
  resetFilteredWordList(){
    // this.WordListO = [];
    this.wordList = [];
    Object.keys(this.WordListO).forEach(key => {
        this.wordList[key] = this.WordListO[key];
    })
  }
  filterItems(ev: any) {
    // this.resetFilteredWordList();
    //deep copy here
    // this.wordList = Object.assign(this.wordList, this.WordListO);
    console.log(this.WordListO)
    this.resetFilteredWordList();
    let val = ev.target.value;
    if (val && val.trim() !== '') {
      Object.keys(this.wordList).forEach(key => {
        this.wordList[key] = this.wordList[key].filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
        if(this.wordList[key].length == 0){
          delete this.wordList[key];
        }
      })
    
      // this.filteredWordList = this.filteredWordList.filter((item) => {
      //   return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      // });
    }
    // if(!this.filteredSigns){
    //   return filte
    // }
  }
  showWordPopup(word){
    let alert = this.alertCtrl.create({
      title: word,
      subTitle: "Does your child understand and/or says this word?",
      inputs: [{
        type: 'checkbox',
        label: 'Understands',
        value: 'understands',
        checked: true
      },{
        type: 'checkbox',
        label: 'Says',
        value: 'says'
      }],
      buttons: [{
        text: 'Save',
        handler: data => {
          this.fs.getProgress().then(data => {
            console.log(data)
          })
        }
      }]
    });
    alert.present();
  }

}
