import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadonlyprojectsetupComponent } from './readonlyprojectsetup.component';

describe('ReadonlyprojectsetupComponent', () => {
  let component: ReadonlyprojectsetupComponent;
  let fixture: ComponentFixture<ReadonlyprojectsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadonlyprojectsetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadonlyprojectsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
