import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addproduct2Component } from './addproduct2.component';

describe('Addproduct2Component', () => {
  let component: Addproduct2Component;
  let fixture: ComponentFixture<Addproduct2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Addproduct2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Addproduct2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
