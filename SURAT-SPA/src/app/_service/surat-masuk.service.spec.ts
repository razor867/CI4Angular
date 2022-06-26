import { TestBed } from '@angular/core/testing';

import { SuratMasukService } from './surat-masuk.service';

describe('SuratMasukService', () => {
  let service: SuratMasukService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuratMasukService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
