import { TestBed } from '@angular/core/testing';

import { DepositeServiceService } from './deposite-service.service';

describe('DepositeServiceService', () => {
  let service: DepositeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepositeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
