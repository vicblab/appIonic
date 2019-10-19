import { TestBed } from '@angular/core/testing';

import { ServicioFirebaseService } from './ReceptorBLE';

describe('ServicioFirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioFirebaseService = TestBed.get(ServicioFirebaseService);
    expect(service).toBeTruthy();
  });
});
