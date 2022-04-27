import { TestBed } from '@angular/core/testing';

import { UserRegistration1Service } from './user-registration1.service';

describe('UserRegistration1Service', () => {
  let service: UserRegistration1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegistration1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
