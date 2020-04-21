import { TestBed } from '@angular/core/testing';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { ICategoryProgress, ISeniorityValues } from '@core/interfaces';
import { PopupService } from '@modules/reusable';
import { SkillsService } from '../../services';
import * as skillsActions from '../actions';
import { SkillsEffects } from '../effects';

describe('Skills effects', () => {
  let actions$: Observable<Action>;
  let scheduler: TestScheduler;
  let skillsEffects: SkillsEffects;
  let skillsService: SpyObj<SkillsService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        SkillsEffects,
        provideMockActions(() => actions$),
        {
          provide: SkillsService,
          useValue: createSpyObj('skillsService', ['getSkillsData', 'getSkillsData', 'getSkillsBySubCategory', 'setUsersSkills']),
        },
        {
          provide: PopupService,
          useValue: {
            error: () => {},
            success: () => {},
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: () => {},
          },
        },
      ],
    });
  });
  beforeEach(() => {
    skillsEffects = TestBed.inject(SkillsEffects);
    skillsService = TestBed.inject(SkillsService) as SpyObj<SkillsService>;
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('loadSkills$ effect', () => {
    it('should return loadSkillsNamesSuccess action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('--a', { a: skillsActions.loadSkillsNames() });
        skillsService.getSkillsData.and.returnValue(cold('-b|', { b: [] as ICategoryProgress[] }));
        const expected$ = '---c';
        expectObservable(skillsEffects.loadSkills$).toBe(expected$, {
          c: skillsActions.loadSkillsNamesSuccess({ categories: [] as ICategoryProgress[] }),
        });
      });
    });
  });

  describe('loadSkillValues$ effect', () => {
    it('should return loadSkillValuesByNameSuccess action', () => {
      const mockTitle = 'Web Technology';
      scheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('--a', { a: skillsActions.loadSkillValuesByName({ categoryName: mockTitle }) });
        skillsService.getSkillsData.and.returnValue(cold('-b|', { b: [{ title: mockTitle }] as ICategoryProgress[] }));
        const expected$ = '---c';
        expectObservable(skillsEffects.loadSkillValues$).toBe(expected$, {
          c: skillsActions.loadSkillValuesByNameSuccess({ subCat: { title: mockTitle } as ICategoryProgress }),
        });
      });
    });

    it('should return loadSkillValuesByNameFail action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('--a', { a: skillsActions.loadSkillValuesByName({ categoryName: 'None existing title' }) });
        skillsService.getSkillsData.and.returnValue(cold('-b|', { b: [] as ICategoryProgress[] }));
        const expected$ = '---c';
        expectObservable(skillsEffects.loadSkillValues$).toBe(expected$, {
          c: skillsActions.loadSkillValuesByNameFail(),
        });
      });
    });
  });

  describe('loadSkillsBySubCat$ effect', () => {
    it('should return loadSkillsBySubCategorySuccess action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('--a', { a: skillsActions.loadSkillsBySubCategory({ catTitle: '', subCatTitle: '', userId: '' }) });
        skillsService.getSkillsBySubCategory.and.returnValue(cold('-b|', { b: {} as ISeniorityValues }));
        const expected$ = '---c';
        expectObservable(skillsEffects.loadSkillsBySubCat$).toBe(expected$, {
          c: skillsActions.loadSkillsBySubCategorySuccess({ levels: {} as ISeniorityValues }),
        });
      });
    });

    it('should return loadSkillsBySubCategoryFail action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('--a', { a: skillsActions.loadSkillsBySubCategory({ catTitle: '', subCatTitle: '', userId: '' }) });
        skillsService.getSkillsBySubCategory.and.returnValue(cold('-#|'));
        const expected$ = '---c';
        expectObservable(skillsEffects.loadSkillsBySubCat$).toBe(expected$, { c: skillsActions.loadSkillsBySubCategoryFail() });
      });
    });
  });

  describe('sendSkillUpdate$ effect', () => {
    it('should return sendSkillUpdateSuccess action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('--a', {
          a: skillsActions.sendSkillUpdate({ catTitle: '', subCatTitle: '', levels: {} as ISeniorityValues, userId: '' }),
        });
        skillsService.setUsersSkills.and.returnValue(cold('-b|', { b: {} }));
        const expected$ = '---c';
        expectObservable(skillsEffects.sendSkillUpdate$).toBe(expected$, { c: skillsActions.sendSkillUpdateSuccess() });
      });
    });

    it('should return sendSkillUpdateFail action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('--a', {
          a: skillsActions.sendSkillUpdate({ catTitle: '', subCatTitle: '', levels: {} as ISeniorityValues, userId: '' }),
        });
        skillsService.setUsersSkills.and.returnValue(cold('-#|'));
        const expected$ = '---c';
        expectObservable(skillsEffects.sendSkillUpdate$).toBe(expected$, { c: skillsActions.sendSkillUpdateFail() });
      });
    });
  });
});
