import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignStudentClassesComponent } from './assign-student-classes.component';

describe('AssignStudentClassesComponent', () => {
  let component: AssignStudentClassesComponent;
  let fixture: ComponentFixture<AssignStudentClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignStudentClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignStudentClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
