import { TestBed } from '@angular/core/testing';

import { LaLogicaReceptoraService } from './LaLogicaReceptora';

describe('LaLogicaReceptoraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LaLogicaReceptoraService = TestBed.get(LaLogicaReceptoraService);
    expect(service).toBeTruthy();
  });
});
