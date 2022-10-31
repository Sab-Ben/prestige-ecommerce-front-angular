import { TestBed } from '@angular/core/testing';

import { HistoriqueCommandeService } from './historiqueCommande';

describe('CompteService', () => {
  let service: HistoriqueCommandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoriqueCommandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
