import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@core/material';
import { MockModule } from 'ng-mocks';

import { SubmitButtonComponent } from './submit-button.component';

describe('SubmitButton component', () => {
  let component: SubmitButtonComponent;
  let fixture: ComponentFixture<SubmitButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitButtonComponent],
      imports: [MockModule(MaterialModule)],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
