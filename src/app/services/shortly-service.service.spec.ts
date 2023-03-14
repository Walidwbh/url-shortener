import { TestBed } from '@angular/core/testing';

import { ShortlyServiceService } from './shortly-service.service';

describe('ShortlyServiceService', () => {
  let service: ShortlyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortlyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
