import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentClassesComponent } from './edit-student-classes.component';

describe('EditStudentClassesComponent', () => {
  let component: EditStudentClassesComponent;
  let fixture: ComponentFixture<EditStudentClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStudentClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudentClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
