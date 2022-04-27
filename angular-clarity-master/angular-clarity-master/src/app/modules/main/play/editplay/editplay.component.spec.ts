import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditplayComponent } from './editplay.component';

describe('EditplayComponent', () => {
  let component: EditplayComponent;
  let fixture: ComponentFixture<EditplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
