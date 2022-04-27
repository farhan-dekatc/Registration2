import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Allproduct2Component } from './allproduct2.component';

describe('Allproduct2Component', () => {
  let component: Allproduct2Component;
  let fixture: ComponentFixture<Allproduct2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Allproduct2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Allproduct2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
