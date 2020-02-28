import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoObjectDetectionComponent } from './video-object-detection.component';

describe('VideoObjectDetectionComponent', () => {
  let component: VideoObjectDetectionComponent;
  let fixture: ComponentFixture<VideoObjectDetectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoObjectDetectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoObjectDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
