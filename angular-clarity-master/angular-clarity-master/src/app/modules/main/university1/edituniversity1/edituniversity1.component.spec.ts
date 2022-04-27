import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Edituniversity1Component } from './edituniversity1.component';

describe('Edituniversity1Component', () => {
  let component: Edituniversity1Component;
  let fixture: ComponentFixture<Edituniversity1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Edituniversity1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Edituniversity1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
