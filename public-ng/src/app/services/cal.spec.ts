import { TestBed } from '@angular/core/testing';

import { CalService } from './cal.service';

describe('Cal', () => {
  let service: CalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
