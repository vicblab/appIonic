import { TestBed } from '@angular/core/testing';

import { LaLogicaService } from './LaLogica';

describe('LaLogicaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LaLogicaService = TestBed.get(LaLogicaService);
    expect(service).toBeTruthy();
  });
});
