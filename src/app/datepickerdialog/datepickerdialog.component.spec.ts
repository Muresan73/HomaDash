import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerdialogComponent } from './datepickerdialog.component';

describe('DatepickerdialogComponent', () => {
  let component: DatepickerdialogComponent;
  let fixture: ComponentFixture<DatepickerdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
