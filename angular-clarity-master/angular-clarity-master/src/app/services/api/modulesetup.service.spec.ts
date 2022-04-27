import { TestBed } from '@angular/core/testing';

import { ModulesetupService } from './modulesetup.service';

describe('ModulesetupService', () => {
  let service: ModulesetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModulesetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
