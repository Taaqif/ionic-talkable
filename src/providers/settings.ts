import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class Settings {
  private SETTINGS_KEY: string = '_settings';

  settings: any;

  _defaults: any;
  _readyPromise: Promise<any>;

  constructor(public storage: Storage, defaults: any) {
    this._defaults = defaults;
  }

  load() {
    return this.storage.get(this.SETTINGS_KEY).then((value) => {
      console.log(value)
      if (value) {
        this.settings = JSON.parse(value);
        return this._mergeDefaults(this._defaults);
      } else {
        return this.setAll(this._defaults).then((val) => {
          this.settings = JSON.parse(val);
        })
      }
    });
  }

  _mergeDefaults(defaults: any) {
    for (let k in defaults) {
      if (!(k in this.settings)) {
        this.settings[k] = defaults[k];
      }
    }
    return this.setAll(this.settings);
  }

  merge(settings: any) {
    for (let k in settings) {
      this.settings[k] = settings[k];
    }
    return this.save();
  }

  setValue(key: string, value: any) {
    this.settings[key] = value;
    return this.storage.set(this.SETTINGS_KEY, JSON.stringify(this.settings));
  }

  setAll(value: any) {
    console.log(value)

    return this.storage.set(this.SETTINGS_KEY, JSON.stringify(value));
  }

  getValue(key: string) {
      return this.settings[key];
    // return this.storage.get(this.SETTINGS_KEY)
    //   .then(settings => {
    //     return settings[key];
    //   });
  }

  save() {
    return this.setAll(this.settings);
  }

  allSettings() {
    return this.settings;
  }

  reset() {
    return this.setAll(this._defaults).then((val) => {
        this.settings = JSON.parse(val);
    })
  }
}
