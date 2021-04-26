import { TestBed } from '@angular/core/testing';

import { SryfallService } from './sryfall.service';

describe('SryfallService', () => {
  let service: SryfallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SryfallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
