import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adduniversity1Component } from './adduniversity1.component';

describe('Adduniversity1Component', () => {
  let component: Adduniversity1Component;
  let fixture: ComponentFixture<Adduniversity1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Adduniversity1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Adduniversity1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
