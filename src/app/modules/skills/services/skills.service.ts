import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { from, of, Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';

import { CATEGORIES_AMOUNT } from '@constants/skills.constants';
import { ICategoryCount, ICategoryProgress, ISeniorityCount, ISeniorityValues, ISubCategoryValue } from '@core/interfaces';
import { default as data } from './data';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private readonly skillsData: ICategoryProgress[];

  constructor(private db: AngularFireDatabase) {
    this.skillsData = data;
  }

  getSkillsData(): Observable<ICategoryProgress[]> {
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

  getProgressOf(skills: ISeniorityValues[], total: number): ISeniorityCount {
    const result = {
      junior: 0,
      middle: 0,
      senior: 0,
    };
    skills.forEach((skill) => {
      Object.keys(skill).forEach((key) => {
        if (skill[key]) {
          result[key] += 1;
        }
      });
    });
    Object.keys(result).forEach((key) => {
      result[key] = Math.round((result[key] * 100) / total);
    });
    return result;
  }

  getAllSkillsWithTitles(userId: string) {
    return from(this.db.database.ref(`users/${userId}/skills`).once('value')).pipe(
      filter((res) => res.val() !== null),
      map((res) => Object.entries(res.val()).map((element): ICategoryCount => ({ title: element[0], levels: Object.values(element[1]) }))),
    );
  }

  getSummaryProgress(computes: ICategoryCount[]): ISubCategoryValue[] {
    return computes.map((element) => ({
      title: element.title,
      levels: this.getProgressOf(element.levels, CATEGORIES_AMOUNT[element.title]),
    }));
  }
}
