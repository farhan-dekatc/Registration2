import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBiComponent } from './select-bi.component';

describe('SelectBiComponent', () => {
  let component: SelectBiComponent;
  let fixture: ComponentFixture<SelectBiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectBiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
