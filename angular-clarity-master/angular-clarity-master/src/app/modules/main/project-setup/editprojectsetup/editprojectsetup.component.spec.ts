import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprojectsetupComponent } from './editprojectsetup.component';

describe('EditprojectsetupComponent', () => {
  let component: EditprojectsetupComponent;
  let fixture: ComponentFixture<EditprojectsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditprojectsetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprojectsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
