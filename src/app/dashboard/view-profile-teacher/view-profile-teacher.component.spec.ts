import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfileTeacherComponent } from './view-profile-teacher.component';

describe('ViewProfileTeacherComponent', () => {
  let component: ViewProfileTeacherComponent;
  let fixture: ComponentFixture<ViewProfileTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProfileTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfileTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
