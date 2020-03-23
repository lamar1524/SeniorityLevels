import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { from, of, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { ISeniorityCount, ISeniorityValues } from '@core/interfaces';
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

  getSkillsBySubCategory(skillCategory: string, skillName: string, userId: string): Observable<ISeniorityValues> {
    return from(this.db.database.ref(`users/${userId}/skills/${skillCategory}/${skillName}`).once('value')).pipe(
      first(),
      map((element) => (element.val() === null ? { junior: false, middle: false, senior: false } : element.val())),
    );
  }

  getAllSkillsValues(userId: string): Observable<ISeniorityValues[]> {
    return from(this.db.database.ref(`users/${userId}/skills`).once('value')).pipe(
      first(),
      map((element) => {
        const toReturn: ISeniorityValues[] = [];
        Object.values(element.val()).forEach((val) => {
          toReturn.push(...Object.values(val));
        });
        return toReturn;
      }),
    );
  }

  getValuesBySkillNames(userId: string, skillCategory: string) {
    return from(this.db.database.ref(`users/${userId}/skills/${skillCategory}`).once('value')).pipe(
      first(),
      map((res) => res.val()),
    );
  }

  // TODO not sure if this should be here, but it will be used app-wide
  getProgressOf(skills: ISeniorityValues[], total: number): ISeniorityCount {
    const result = {
      junior: 0,
      middle: 0,
      senior: 0,
    };
    skills.forEach((skill) => {
      if (skill.junior) {
        result.junior += 1;
      }
      if (skill.middle) {
        result.middle += 1;
      }
      if (skill.senior) {
        result.senior += 1;
      }
    });
    result.junior = Math.round((result.junior * 100) / total);
    result.middle = Math.round((result.middle * 100) / total);
    result.senior = Math.round((result.senior * 100) / total);
    return result;
  }
}
