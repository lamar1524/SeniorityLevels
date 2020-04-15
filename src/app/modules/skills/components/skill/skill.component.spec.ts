import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { User } from 'firebase';
import { MockModule } from 'ng-mocks';
import { of } from 'rxjs';

import { MaterialModule } from '@core/material';
import { selectCurrentUser, AuthModuleState } from '@modules/authentication/store';
import { PopupService, SharedUiModule } from '@modules/reusable';
import { seniorityEnum, SlugTextifyPipe, TextSlugifyPipe } from '@modules/skills';
import { loadSkillsBySubCategory, loadSkillValuesByName, sendSkillUpdate } from '@modules/skills/store/actions';
import { SkillsModuleState } from '@modules/skills/store/reducers';
import { selectSkillsSubCategories } from '@modules/skills/store/selectors';
import { default as data } from '../../services/data';
import { SkillComponent } from './skill.component';

describe('SkillComponent', () => {
  let component: SkillComponent;
  let fixture: ComponentFixture<SkillComponent>;
  let store: Store<SkillsModuleState | AuthModuleState>;
  let activeRoute: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillComponent, SlugTextifyPipe, TextSlugifyPipe],
      imports: [RouterTestingModule, MockModule(MaterialModule), MockModule(SharedUiModule)],
      providers: [
        {
          provide: PopupService,
          useValue: {},
        },
        {
          provide: Store,
          useValue: {
            select: () => of({}),
            dispatch: () => {},
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ category: 'web-technology' }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(Store);
    activeRoute = TestBed.inject(ActivatedRoute);
    spyOn(activeRoute.params, 'subscribe');
    fixture = TestBed.createComponent(SkillComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('routeChangeHandler', () => {
    const params = { category: 'web-technology' };
    beforeEach(() => {
      spyOn(component, 'loadSubCategoriesHandler');
    });

    it('should dispatch proper action', () => {
      spyOn(store, 'dispatch');
      component.routeChangeHandler(params);
      expect(store.dispatch).toHaveBeenCalledWith(loadSkillValuesByName({ categoryName: 'Web Technology' }));
    });

    it('should select currentUser', () => {
      spyOn(store, 'select').and.returnValue(of({}));
      component.routeChangeHandler(params);
      expect(store.select).toHaveBeenCalledWith(selectSkillsSubCategories);
    });
  });

  describe('loadSubCategoriesHandler method', () => {
    it('should select currentUser from store', () => {
      spyOn(component, 'loadUserHandler');
      spyOn(store, 'select').and.returnValue(of({}));
      component.loadSubCategoriesHandler(data[0], 'Web Technology');
      expect(store.select).toHaveBeenCalledWith(selectCurrentUser);
    });
  });

  describe('loadUserHandler method', () => {
    it('should dispatch proper action', () => {
      const mockObj = {
        userId: '',
        catTitle: '',
        subCatTitle: '',
      };
      spyOn(store, 'dispatch');
      component.loadUserHandler({ uid: '' } as User, '', '');
      expect(store.dispatch).toHaveBeenCalledWith(loadSkillsBySubCategory(mockObj));
    });
  });

  describe('chooseSubCategory method', () => {
    it('should call querySelectorAll method', () => {
      spyOn(document, 'querySelectorAll').and.returnValue([
        {
          classList: {
            remove: () => {},
            add: () => {},
          },
        },
      ] as any);
      component.chooseSubCategory({} as any, 0);
      expect(document.querySelectorAll).toHaveBeenCalledWith('.table__label');
    });
  });

  describe('sendSkill method', () => {
    it('should dispatch proper action', () => {
      const mockObj = {
        catTitle: '',
        subCatTitle: '',
        levels: {} as any,
        userId: '',
      };
      spyOn(store, 'dispatch');
      component.sendSkill(seniorityEnum.junior, '', '', {} as any, '');
      expect(store.dispatch).toHaveBeenCalledWith(sendSkillUpdate(mockObj));
    });
  });
});
