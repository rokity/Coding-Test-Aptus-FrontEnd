import { TestBed } from '@angular/core/testing';

import { GetEntitiesService } from './get-entities.service';

describe('GetEntitiesService', () => {
  let service: GetEntitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetEntitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
