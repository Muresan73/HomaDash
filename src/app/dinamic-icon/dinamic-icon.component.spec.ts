import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicIconComponent } from './dinamic-icon.component';

describe('DinamicIconComponent', () => {
  let component: DinamicIconComponent;
  let fixture: ComponentFixture<DinamicIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinamicIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinamicIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
