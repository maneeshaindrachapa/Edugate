import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfileAssistantComponent } from './view-profile-assistant.component';

describe('ViewProfileAssistantComponent', () => {
  let component: ViewProfileAssistantComponent;
  let fixture: ComponentFixture<ViewProfileAssistantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProfileAssistantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfileAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
