import { EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@core/material';
import { MockModule } from 'ng-mocks';

import { seniorityEnum } from '@modules/skills';
import { LevelSelectComponent } from './level-select.component';

describe('LevelSelectComponent', () => {
  let component: LevelSelectComponent;
  let fixture: ComponentFixture<LevelSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LevelSelectComponent],
      imports: [MockModule(MaterialModule), MockModule(FormsModule)],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should assign values properly', () => {
    it('should assign chooseLevel method properly', () => {
      expect(component.chooseLevel).toEqual(new EventEmitter<seniorityEnum>());
    });
    it('should assign options properly', () => {
      expect(component.options).toEqual([seniorityEnum.junior, seniorityEnum.middle, seniorityEnum.senior]);
    });
    it('should assign selectedValue properly', () => {
      expect(component.selectedValue).toEqual(seniorityEnum.junior);
    });
  });
});
