import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { selectSkillsCategories } from '@modules/skills/store/selectors';
import { Store } from '@ngrx/store';
import createSpyObj = jasmine.createSpyObj;
import { MockModule } from 'ng-mocks';

import { MaterialModule } from '@core/material';
import { SlugTextifyPipe, TextSlugifyPipe } from '@modules/skills';
import { loadSkillsNames } from '@modules/skills/store/actions';
import { SkillsModuleState } from '@modules/skills/store/reducers';
import { SkillsComponent } from './skills.component';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;
  let store: Store<SkillsModuleState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SkillsComponent, SlugTextifyPipe, TextSlugifyPipe],
      imports: [RouterTestingModule, MockModule(MaterialModule)],
      providers: [
        {
          provide: Store,
          useValue: createSpyObj('store', ['dispatch', 'select']),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.get(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch proper action', () => {
    expect(store.dispatch).toHaveBeenCalledWith(loadSkillsNames());
  });

  it('should select proper value from the store', () => {
    expect(store.select).toHaveBeenCalledWith(selectSkillsCategories);
  });
});
