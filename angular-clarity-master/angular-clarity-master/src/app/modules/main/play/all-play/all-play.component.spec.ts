import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPlayComponent } from './all-play.component';

describe('AllPlayComponent', () => {
  let component: AllPlayComponent;
  let fixture: ComponentFixture<AllPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
