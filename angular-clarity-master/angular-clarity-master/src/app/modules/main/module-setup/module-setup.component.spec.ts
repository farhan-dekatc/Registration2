import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleSetupComponent } from './module-setup.component';

describe('ModuleSetupComponent', () => {
  let component: ModuleSetupComponent;
  let fixture: ComponentFixture<ModuleSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
