import { TestBed } from '@angular/core/testing';

import { WireframeService } from './wireframe.service';

describe('WireframeService', () => {
  let service: WireframeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WireframeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
