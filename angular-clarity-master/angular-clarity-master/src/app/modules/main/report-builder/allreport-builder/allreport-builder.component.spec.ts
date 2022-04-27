import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllreportBuilderComponent } from './allreport-builder.component';

describe('AllreportBuilderComponent', () => {
  let component: AllreportBuilderComponent;
  let fixture: ComponentFixture<AllreportBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllreportBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllreportBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
