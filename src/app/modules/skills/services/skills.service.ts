import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { from, of } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { ISeniorityValues } from '@core/interfaces';
import { default as data } from './data';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private skillsData;

  constructor(private db: AngularFireDatabase) {
    this.skillsData = data;
  }

  getSkillsData() {
    return of(this.skillsData);
  }

  setUsersSkills(skillCategory: string, skillName: string, skillValues: ISeniorityValues, userId: string) {
    return from(this.db.database.ref(`users/${userId}/skills/${skillCategory}/${skillName}`).set(skillValues)).pipe(first());
  }

  getSkillsBySubCategory(skillCategory: string, skillName: string, userId: string) {
    return from(this.db.database.ref(`users/${userId}/skills/${skillCategory}/${skillName}`).once('value')).pipe(
      first(),
      map((element) => (element.val() === null ? { junior: false, middle: false, senior: false } : element.val())),
    );
  }
}
