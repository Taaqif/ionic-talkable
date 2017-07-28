import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FileServiceProvider } from "../../providers/file-service/file-service";
@Component({
  selector: 'page-word-list',
  templateUrl: 'word-list.html',
})
export class WordListPage {
  wordList: any;
  savedWords: any;
  WordListO: any;
  category: any = null;
  sortedWordList: any;
  savedWordList: any;
  constructor(public navCtrl: NavController,  
              public navParams: NavParams, 
              public fs: FileServiceProvider,
              public alertCtrl: AlertController) {
                // this.fs.loadWordList();
        this.fs.getWordList().subscribe(data => {
        this.wordList = data;
        this.WordListO = data;
        this.generateSortedWordList();
        // array.forEach(element => {
          // this.resetFilteredWordList();
        // });
        
      })
      this.fs.loadSavedWordList().then(() => {
        this.savedWordList = this.fs.getSavedWordList();
        console.log(this.savedWordList)
      })
      if(typeof this.navParams.data === 'string' || this.navParams.data instanceof String ){
        this.category = this.navParams.data;
        console.log(this.category);
      }
      
  }
  resetFilteredWordList(){
    // this.WordListO = [];
    this.wordList = [];
    Object.keys(this.WordListO).forEach(key => {
        this.wordList[key] = this.WordListO[key];
    })
  }
  generateSortedWordList(){
    this.sortedWordList = [];
    Object.keys(this.WordListO).forEach(key => {
      this.WordListO[key].forEach(element => {
        this.sortedWordList.push(element);
      });  
    })
    this.sortedWordList.sort(function(a,b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if( a == b) return 0;
    return a < b ? -1 : 1;
});
  }
updateSavedWordList(word){
  if(!this.savedWordList[word]){
    this.savedWordList[word] = {"checked": true}
  }else{
    delete this.savedWordList[word];
  }
  this.fs.setSavedWordList(this.savedWordList);
}
 customTrackBy(index, item) {
    return false ;
  }
  filterItems(ev: any) {
    // this.resetFilteredWordList();
    //deep copy here
    // this.wordList = Object.assign(this.wordList, this.WordListO);
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
  filterItemsSorted(ev: any) {
    // this.resetFilteredWordList();
    //deep copy here
    // this.wordList = Object.assign(this.wordList, this.WordListO);
    this.generateSortedWordList();
    let val = ev.target.value;
    if (val && val.trim() !== '') {
        this.sortedWordList = this.sortedWordList.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });

    
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
  viewCategory(key){
    this.navCtrl.push(WordListPage, key)
  }
  // initializeWordList(){
  //   let init = [];
  //   this.savedWords = init;
  //   this.storage.set('settings', this.settings);
  // }
  ionViewWillLeave(){
    if(this.category){
      this.category = null;
      console.log(this.category)
    }
    
  }

}
