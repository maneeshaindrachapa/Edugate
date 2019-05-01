import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfileStudentComponent } from './view-profile-student.component';

describe('ViewProfileStudentComponent', () => {
  let component: ViewProfileStudentComponent;
  let fixture: ComponentFixture<ViewProfileStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProfileStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfileStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
