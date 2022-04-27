import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddreportBuilderComponent } from './addreport-builder.component';

describe('AddreportBuilderComponent', () => {
  let component: AddreportBuilderComponent;
  let fixture: ComponentFixture<AddreportBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddreportBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddreportBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
