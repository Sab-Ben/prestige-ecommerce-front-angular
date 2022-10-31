import { TestBed } from '@angular/core/testing';

import { InfoAdressesService } from './info-adresses.service';

describe('HistoriqueCommandeService', () => {
  let service: InfoAdressesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoAdressesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
