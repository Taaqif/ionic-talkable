import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FileServiceProvider {
  data: any;
  constructor(public http: Http) {
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

}
