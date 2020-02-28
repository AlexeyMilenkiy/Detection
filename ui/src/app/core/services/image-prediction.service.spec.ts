import { TestBed } from "@angular/core/testing";

import { ImagePredictionService } from "./image-prediction.service";

describe("ImageDetectionService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ImagePredictionService = TestBed.get(ImagePredictionService);
    expect(service).toBeTruthy();
  });
});
