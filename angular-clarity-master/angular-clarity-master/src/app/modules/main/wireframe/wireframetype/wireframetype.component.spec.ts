import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WireframetypeComponent } from './wireframetype.component';

describe('WireframetypeComponent', () => {
  let component: WireframetypeComponent;
  let fixture: ComponentFixture<WireframetypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WireframetypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WireframetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
