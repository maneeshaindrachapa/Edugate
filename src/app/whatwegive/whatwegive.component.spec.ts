import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatwegiveComponent } from './whatwegive.component';

describe('WhatwegiveComponent', () => {
  let component: WhatwegiveComponent;
  let fixture: ComponentFixture<WhatwegiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatwegiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatwegiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
