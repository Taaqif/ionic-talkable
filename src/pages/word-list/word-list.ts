import { Component, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { NavController, NavParams, ToastController ,Content, AlertController   } from 'ionic-angular';
import { FileServiceProvider } from "../../providers/file-service/file-service";
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-word-list',
  templateUrl: 'word-list.html',
})
export class WordListPage {
  @ViewChild(Content) content: Content;
  wordList: any;
  WordListSegment: string = 'AllWords';
  savedWords: any;
  WordListO: any;
  category: any = null;
  sortedWordList: any;
  savedWordList: any;
  ready: boolean = false;
  searching: boolean = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public fs: FileServiceProvider,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private socialSharing: SocialSharing,
    public cd: ChangeDetectorRef ) {
    // this.fs.loadWordList();
      this.wordList = this.fs.getWordList();
      this.WordListO = this.fs.getWordList();
      this.generateSortedWordList();
      // array.forEach(element => {
      // this.resetFilteredWordList();
      // });

    if (typeof this.navParams.data === 'string' || this.navParams.data instanceof String) {
      this.category = this.navParams.data;
    }

  }
  resetFilteredWordList() {
    // this.WordListO = [];
    this.wordList = [];
    Object.keys(this.WordListO).forEach(key => {
      this.wordList[key] = this.WordListO[key];
    })
  }
  shareWords(){
    let savedWordsString = "";
    Object.keys(this.savedWordList).forEach(word => {
      savedWordsString += word + " on "+ this.savedWordList[word].date +",\n" 
    })
    savedWordsString = savedWordsString.trim().slice(0, -1);
    this.socialSharing.share(savedWordsString, "My child can say", null,null)

  }
  presentPromptCustomWord() {
    let alert = this.alertCtrl.create({
      title: 'Add a Custom Word',
      subTitle: ' Add a new word to your list',
      inputs: [
        {
          name: 'word',
          placeholder: 'Custom word'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log(data);
            if (data.word.length > 0) {
              // logged in!
              
              this.addToSavedWordList(data.word);
              return true;
            } else {
              // invalid login
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }
  generateSortedWordList() {
    this.sortedWordList = [];
    Object.keys(this.WordListO).forEach(key => {
      this.WordListO[key].forEach(element => {
        this.sortedWordList.push({word: element, category: key});
      });
    })
    this.sortedWordList.sort(function (a, b) {
      a = a.word.toLowerCase();
      b = b.word.toLowerCase();
      if (a == b) return 0;
      return a < b ? -1 : 1;
    });
    this.ready = true;
  }
  addToSavedWordList(word){
    var displayDate = new Date().toLocaleDateString('en-GB');
    let toast;
    if (!this.savedWordList[word]) {
      this.savedWordList[word] = { "date": displayDate }
      this.savedWordList = this.sortObject(this.savedWordList);
      toast = this.toastCtrl.create({
        message: word + ' saved to word list',
        duration: 2000,
        position: 'bottom'
      });
    
      
    } else {
      toast = this.toastCtrl.create({
        message: word + ' already in saved word list',
        duration: 2000,
        position: 'bottom'
      });
      //delete this.savedWordList[word];
    }
    toast.present();
    this.fs.setSavedWordList(this.savedWordList);
  }
  sortObject(obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
        result[key] = obj[key];
        return result;
    }, {});
}
  removeFromSavedWordList(word, item){
    if(this.savedWordList[word]){
      delete this.savedWordList[word];
      this.fs.setSavedWordList(this.savedWordList);
      item.close();
    }
  }
  isSavedWord(word){
    if(this.savedWordList[word]){
      return true;
    }else{
      return false;
    }
  }
  updateSavedWordList(word) {
    if (!this.savedWordList[word]) {
      this.savedWordList[word] = { "checked": true }
    } else {
      delete this.savedWordList[word];
    }
    this.fs.setSavedWordList(this.savedWordList);
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
        if (this.wordList[key].length == 0) {
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
      this.searching = true;
      this.sortedWordList = this.sortedWordList.filter((item) => {
        return (item.word.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });


      // this.filteredWordList = this.filteredWordList.filter((item) => {
      //   return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      // });
    } else {
      this.searching = false;
    }
    // if(!this.filteredSigns){
    //   return filte
    // }
  }
  // showWordPopup(word) {
  //   let alert = this.alertCtrl.create({
  //     title: word,
  //     subTitle: "Does your child understand and/or says this word?",
  //     inputs: [{
  //       type: 'checkbox',
  //       label: 'Understands',
  //       value: 'understands',
  //       checked: true
  //     }, {
  //       type: 'checkbox',
  //       label: 'Says',
  //       value: 'says'
  //     }],
  //     buttons: [{
  //       text: 'Save',
  //       handler: data => {
  //         this.fs.getProgress().then(data => {
  //           console.log(data)
  //         })
  //       }
  //     }]
  //   });
  //   alert.present();
  // }
  
  segmentChanged(event){
    this.content.resize();
  }
  viewCategory(key) {
    this.navCtrl.push(WordListPage, key)
  }
  ionViewWillEnter() {
    
    this.fs.loadSavedWordList().then(() => {
      this.savedWordList = this.fs.getSavedWordList();
    })
  }
  // initializeWordList(){
  //   let init = [];
  //   this.savedWords = init;
  //   this.storage.set('settings', this.settings);
  // }
  ionViewWillLeave() {
    if (this.category) {
      this.category = null;
      console.log(this.category)
    }

  }

}
