import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiWidgetsComponent } from './bi-widgets.component';

describe('BiWidgetsComponent', () => {
  let component: BiWidgetsComponent;
  let fixture: ComponentFixture<BiWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiWidgetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
