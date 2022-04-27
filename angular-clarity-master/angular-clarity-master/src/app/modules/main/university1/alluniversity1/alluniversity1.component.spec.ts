import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Alluniversity1Component } from './alluniversity1.component';

describe('Alluniversity1Component', () => {
  let component: Alluniversity1Component;
  let fixture: ComponentFixture<Alluniversity1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Alluniversity1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Alluniversity1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
