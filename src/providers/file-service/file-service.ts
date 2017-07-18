import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the FileServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
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

}
