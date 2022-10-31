import { TestBed } from '@angular/core/testing';

import { InfoUtilisateurService } from './info-utilisateur.service';

describe('InfoUtilisateurService', () => {
  let service: InfoUtilisateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoUtilisateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
