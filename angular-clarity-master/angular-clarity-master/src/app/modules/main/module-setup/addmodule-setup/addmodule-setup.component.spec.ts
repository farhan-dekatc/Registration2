import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmoduleSetupComponent } from './addmodule-setup.component';

describe('AddmoduleSetupComponent', () => {
  let component: AddmoduleSetupComponent;
  let fixture: ComponentFixture<AddmoduleSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmoduleSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmoduleSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
