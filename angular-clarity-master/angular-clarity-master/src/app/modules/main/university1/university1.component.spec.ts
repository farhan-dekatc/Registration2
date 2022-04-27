import { ComponentFixture, TestBed } from '@angular/core/testing';

import { University1Component } from './university1.component';

describe('University1Component', () => {
  let component: University1Component;
  let fixture: ComponentFixture<University1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ University1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(University1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
