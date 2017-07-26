import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage'

@Injectable()
export class FileServiceProvider {
  data: any;
  activePage: any;
  currentWeek: number;
  constructor(public http: Http,public storage: Storage) {
    this.data = null;
    // console.log('Hello FileServiceProvider Provider');
  }
  getData(file) {
    return this.http.get(file)
      .map(res => res.json());
  }
  getWeekContent(week) {
    return this.http.get('assets/data/week'+week+'.json')
      .map(res => res.json());
  }
  getKeyWordSigns(){
    return this.http.get('assets/data/key-word-signs.json')
      .map(res => res.json());
  }
  getKeyWordSignObject(keyWordArray){
    return this.http.get('assets/data/key-word-signs.json')
      .map(res => {
        let data = res.json();
        let listWords = [];
        for (var index = 0; index < data.length; index++) {
          if(keyWordArray.includes(data[index].word)){
            listWords.push(data[index]);
          }
          //handle keywords not found in keyword list here
        }
      return listWords;
        // return res.json()
      });
  }
  findKeyWordSign(keyWord){
    
  }
  getWordList(){
    return this.http.get('assets/data/word-list.json')
      .map(res => res.json());
  }
  unlockAllContent(){}
  getActivePage(){
    return this.activePage;
  }
  setActivePage(page){
    this.activePage = page;
  }
  getCurrentWeek(){
    return this.currentWeek;
  }
  setCurrentWeek(week){
    this.currentWeek = week;
  }
  getSettings(setting?){
    
    return new Promise(resolve => {
      if(setting){
        this.storage.get('settings').then(data => {
          resolve(data[setting]);
        })
      }else{
        resolve(this.storage.get('settings'));
      }
    })
    
  }
  getProgress(progress?){
    return new Promise(resolve => {
      if(progress){
        this.storage.get('progress').then(data => {
          resolve(data[progress]);
        })
      }else{
        resolve(this.storage.get('progress'));
      }
    })
  }

}
