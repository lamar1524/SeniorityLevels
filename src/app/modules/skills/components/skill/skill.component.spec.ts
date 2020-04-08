import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockModule } from 'ng-mocks';
import { of } from 'rxjs';

import { MaterialModule } from '@core/material';
import { AuthModuleState } from '@modules/authentication/store';
import { PopupService, SharedUiModule } from '@modules/reusable';
import { SlugTextifyPipe, TextSlugifyPipe } from '@modules/skills';
import { loadSkillValuesByName } from '@modules/skills/store/actions';
import { SkillsModuleState } from '@modules/skills/store/reducers';
import { default as data } from '../../services/data';
import { SkillComponent } from './skill.component';

describe('SkillComponent', () => {
  let component: SkillComponent;
  let fixture: ComponentFixture<SkillComponent>;
  let skillsStore: Store<SkillsModuleState>;
  let authStore: Store<AuthModuleState>;
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
            dispatch: () => {},
            select: () => of({}),
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
    skillsStore = TestBed.get(Store);
    authStore = TestBed.get(Store);
    activeRoute = TestBed.get(ActivatedRoute);
    fixture = TestBed.createComponent(SkillComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    spyOn(activeRoute.params, 'subscribe').and.stub();
    expect(component).toBeTruthy();
  });

  describe('routeChangeHandler', () => {
    it('should dispatch proper action', () => {
      spyOn(skillsStore, 'dispatch');
      spyOn(skillsStore, 'select').and.returnValue(of(data[0]));
      component.routeChangeHandler({ category: 'web-technology' });
      expect(skillsStore.dispatch).toHaveBeenCalledWith(loadSkillValuesByName({ categoryName: 'Web Technology' }));
    });
  });
});
