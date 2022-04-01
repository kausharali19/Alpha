import { TestBed } from '@angular/core/testing';

import { TransactionLogServiceService } from './transaction-log-service.service';

describe('TransactionLogServiceService', () => {
  let service: TransactionLogServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionLogServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
