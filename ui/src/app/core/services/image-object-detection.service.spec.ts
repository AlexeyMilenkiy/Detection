import { TestBed } from "@angular/core/testing";

import { ImageObjectDetectionService } from "./image-object-detection.service";

describe("ObjectDetectionService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ImageObjectDetectionService = TestBed.get(
      ImageObjectDetectionService
    );
    expect(service).toBeTruthy();
  });
});
