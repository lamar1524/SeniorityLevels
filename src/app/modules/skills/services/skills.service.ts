import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { from } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { ISeniorityValues } from '@core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  constructor(private db: AngularFireDatabase) {}

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
