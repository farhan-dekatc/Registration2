import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UinameeditComponent } from './uinameedit.component';

describe('UinameeditComponent', () => {
  let component: UinameeditComponent;
  let fixture: ComponentFixture<UinameeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UinameeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UinameeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
