import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllwireframeComponent } from './allwireframe.component';

describe('AllwireframeComponent', () => {
  let component: AllwireframeComponent;
  let fixture: ComponentFixture<AllwireframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllwireframeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllwireframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
