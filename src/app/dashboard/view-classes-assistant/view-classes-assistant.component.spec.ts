import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClassesAssistantComponent } from './view-classes-assistant.component';

describe('ViewClassesAssistantComponent', () => {
  let component: ViewClassesAssistantComponent;
  let fixture: ComponentFixture<ViewClassesAssistantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewClassesAssistantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClassesAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
