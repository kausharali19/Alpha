import { TestBed } from '@angular/core/testing';

import { BankDataServiceService } from './bank-data-service.service';

describe('BankDataServiceService', () => {
  let service: BankDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
