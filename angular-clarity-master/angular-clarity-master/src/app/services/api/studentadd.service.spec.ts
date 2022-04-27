import { TestBed } from '@angular/core/testing';

import { StudentaddService } from './studentadd.service';

describe('StudentaddService', () => {
  let service: StudentaddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentaddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
