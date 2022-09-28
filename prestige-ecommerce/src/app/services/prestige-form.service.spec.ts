import { TestBed } from '@angular/core/testing';

import { PrestigeFormService } from './prestige-form.service';

describe('PrestigeFormServiceService', () => {
  let service: PrestigeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestigeFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
