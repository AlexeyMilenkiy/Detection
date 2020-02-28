import { TestBed } from '@angular/core/testing';

import { VideoObjectDetectionService } from './video-object-detection.service';

describe('VideoObjectDetectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoObjectDetectionService = TestBed.get(VideoObjectDetectionService);
    expect(service).toBeTruthy();
  });
});
