import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ImageObjectDetectionComponent } from "./image-object-detection.component";

describe("ObjectDetectionComponent", () => {
  let component: ImageObjectDetectionComponent;
  let fixture: ComponentFixture<ImageObjectDetectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageObjectDetectionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageObjectDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
