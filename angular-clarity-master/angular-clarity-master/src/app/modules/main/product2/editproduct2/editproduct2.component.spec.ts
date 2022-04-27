import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editproduct2Component } from './editproduct2.component';

describe('Editproduct2Component', () => {
  let component: Editproduct2Component;
  let fixture: ComponentFixture<Editproduct2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Editproduct2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Editproduct2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
