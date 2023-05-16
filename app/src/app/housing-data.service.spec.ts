import { TestBed } from '@angular/core/testing';

import { HousingDataService } from './housing-data.service';

describe('HousingDataService', () => {
  let service: HousingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HousingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
