import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditwireframeComponent } from './editwireframe.component';

describe('EditwireframeComponent', () => {
  let component: EditwireframeComponent;
  let fixture: ComponentFixture<EditwireframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditwireframeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditwireframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
