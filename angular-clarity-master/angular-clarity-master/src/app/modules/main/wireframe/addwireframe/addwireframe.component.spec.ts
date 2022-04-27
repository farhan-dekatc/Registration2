import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddwireframeComponent } from './addwireframe.component';

describe('AddwireframeComponent', () => {
  let component: AddwireframeComponent;
  let fixture: ComponentFixture<AddwireframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddwireframeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddwireframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
