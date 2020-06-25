import { TestBed } from '@angular/core/testing';

import { GetTextsService } from './get-texts.service';

describe('GetTextsService', () => {
  let service: GetTextsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTextsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
