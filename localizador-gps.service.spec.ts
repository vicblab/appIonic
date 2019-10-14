import { TestBed } from '@angular/core/testing';

import { LocalizadorGPSService } from './LocalizadorGPS';

describe('LocalizadorGPSService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalizadorGPSService = TestBed.get(LocalizadorGPSService);
    expect(service).toBeTruthy();
  });
});
