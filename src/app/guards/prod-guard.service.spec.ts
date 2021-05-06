import { TestBed } from '@angular/core/testing';

import { ProdGuardService } from './prod-guard.service';

describe('ProdGuardService', () => {
  let service: ProdGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
