import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { themeEnum } from '@shared/enum/theme.enum';
import { User } from 'firebase';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  private currentTheme: BehaviorSubject<themeEnum>;
  private readonly themeKey: string;

  constructor() {
    this.themeKey = 'Theme';
    if (this.getThemeFromStorage()) {
      this.currentTheme = new BehaviorSubject<themeEnum>(this.getThemeFromStorage() as themeEnum);
    } else {
      this.setThemeInStorage(themeEnum.light);
      this.currentTheme = new BehaviorSubject<themeEnum>(themeEnum.light);
    }
  }

  getTheme = (): Observable<themeEnum> => {
    return this.currentTheme.asObservable();
  };

  setTheme = (theme: themeEnum) => {
    this.currentTheme.next(theme);
    this.setThemeInStorage(theme);
  };

  getThemeFromStorage = () => localStorage.getItem(this.themeKey);

  setThemeInStorage = (value: themeEnum) => localStorage.setItem(this.themeKey, value);

  toggleTheme() {
    this.currentTheme.getValue() === themeEnum.light ? this.setTheme(themeEnum.dark) : this.setTheme(themeEnum.light);
  }
}
