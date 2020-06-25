import { TestBed } from '@angular/core/testing';

import { PostAnnotationService } from './post-annotation.service';

describe('PostAnnotationService', () => {
  let service: PostAnnotationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostAnnotationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
