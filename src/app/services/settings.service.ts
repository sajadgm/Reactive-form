import { ISettings } from './../interfaces/settings.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  setting: ISettings = {
    freeLabel: true,
    busyLabel: true,
    chartVisibility: true,
  };
  constructor() {}

  ChangeSettings() {
    // let temp = this.SETTINGS_DATA;
  }
}