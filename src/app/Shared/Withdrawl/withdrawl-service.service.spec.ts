import { TestBed } from '@angular/core/testing';

import { WithdrawlServiceService } from './withdrawl-service.service';

describe('WithdrawlServiceService', () => {
  let service: WithdrawlServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WithdrawlServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
