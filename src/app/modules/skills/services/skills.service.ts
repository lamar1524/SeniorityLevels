import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { from } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { ISeniority } from '@core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  constructor(private db: AngularFireDatabase) {}

  setUsersSkills(skillCategory: string, skillName: string, skillValues: ISeniority, userId: string) {
    return from(this.db.database.ref(`users/${userId}/skills/${skillCategory}/${skillName}`).set(skillValues)).pipe(first());
  }

  getSkillsBySubCategory(skillCategory: string, skillName: string, userId: string) {
    return from(this.db.database.ref(`users/${userId}/skills/${skillCategory}/${skillName}`).once('value')).pipe(
      first(),
      map((element) => (element.val() === null ? { junior: false, middle: false, senior: false } : element.val())),
    );
  }

  getAllSkillsValues(userId: string) {
    return from(this.db.database.ref(`users/${userId}/skills`).once('value')).pipe(
      first(),
      map((element) => {
        const toReturn: ISeniority[] = [];
        Object.values(element.val()).forEach((val) => {
          toReturn.push(...Object.values(val));
        });
        return toReturn;
      }),
    );
  }

  getProgressOf(skills: ISeniority[], total: number): ISeniority {
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
