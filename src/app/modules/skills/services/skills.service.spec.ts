import { TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { CATEGORIES_AMOUNT } from '@constants/skills.constants';
import { of, Observable } from 'rxjs';

import { ISeniorityValues } from '@core/interfaces';
import { SkillsService } from './skills.service';

describe('SkillsService', () => {
  let service: SkillsService;
  let db: AngularFireDatabase;
  const userIdMock = '1';
  const skillCategoryMock = '2';
  const skillNameMock = '3';

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFireDatabase,
          useValue: {
            database: {
              ref: () => ({
                set: () => of({}),
                once: () => of({}),
              }),
            },
          },
        },
      ],
    }),
  );
  beforeEach(() => {
    service = TestBed.get(SkillsService);
    db = TestBed.get(AngularFireDatabase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getSkillsData method', () => {
    it('should return observable', () => {
      expect(service.getSkillsData() instanceof Observable).toEqual(true);
    });
  });

  describe('setUsersSkills method', () => {
    it('should return an observable', () => {
      expect(service.setUsersSkills(skillCategoryMock, skillNameMock, {} as ISeniorityValues, userIdMock) instanceof Observable).toEqual(
        true,
      );
    });

    it('should call db.database.ref method', () => {
      spyOn(db.database, 'ref').and.callThrough();
      service.setUsersSkills(skillCategoryMock, skillNameMock, {} as ISeniorityValues, userIdMock);
      expect(db.database.ref).toHaveBeenCalledWith(`users/${userIdMock}/skills/${skillCategoryMock}/${skillNameMock}`);
    });
  });

  describe('getSkillsBySubCategory method', () => {
    it('should return observable', () => {
      expect(service.getSkillsBySubCategory(skillCategoryMock, skillNameMock, userIdMock) instanceof Observable).toEqual(true);
    });

    it('should call db.database.ref method', () => {
      spyOn(db.database, 'ref').and.callThrough();
      service.getSkillsBySubCategory(skillCategoryMock, skillNameMock, userIdMock);
      expect(db.database.ref).toHaveBeenCalledWith(`users/${userIdMock}/skills/${skillCategoryMock}/${skillNameMock}`);
    });
  });

  describe('getAllSkillsValues method', () => {
    it('should return an observable', () => {
      expect(service.getAllSkillsValues(userIdMock) instanceof Observable).toEqual(true);
    });

    it('should call db.database.ref method', () => {
      spyOn(db.database, 'ref').and.callThrough();
      service.getAllSkillsValues(userIdMock);
      expect(db.database.ref).toHaveBeenCalledWith(`users/${userIdMock}/skills`);
    });
  });

  describe('getProgressOf method', () => {
    it('should compute properly', () => {
      const skillsValuesMock = [];
      for (let i = 0; i < 15; i++) {
        skillsValuesMock.push({
          junior: true,
          middle: true,
          senior: true,
        });
      }
      const result = service.getProgressOf(skillsValuesMock, CATEGORIES_AMOUNT.total);
      expect(result).toEqual({ junior: 14, middle: 14, senior: 14 });
    });
  });

  describe('getAllSkillsWithTitles method', () => {
    it('should return an observable', () => {
      expect(service.getAllSkillsWithTitles(userIdMock) instanceof Observable).toEqual(true);
    });

    it('should call db.database.ref method', () => {
      spyOn(db.database, 'ref').and.callThrough();
      service.getAllSkillsWithTitles(userIdMock);
      expect(db.database.ref).toHaveBeenCalledWith(`users/${userIdMock}/skills`);
    });
  });
});
