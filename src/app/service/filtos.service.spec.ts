import { TestBed } from '@angular/core/testing';

import { FiltosService } from './filtos.service';

describe('FiltosService', () => {
  let service: FiltosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
