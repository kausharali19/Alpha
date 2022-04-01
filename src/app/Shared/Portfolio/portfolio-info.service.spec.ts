import { TestBed } from '@angular/core/testing';

import { PortfolioInfoService } from './portfolio-info.service';

describe('PortfolioInfoService', () => {
  let service: PortfolioInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
