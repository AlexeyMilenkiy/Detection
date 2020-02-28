import { Component, OnInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { VideoObjectDetectionService } from "../../services/video-object-detection.service";
import {
  FileDetectionObject,
  FileObjectInterface
} from "../../models/imagesModels";

@Component({
  selector: "app-video-object-detection",
  templateUrl: "./video-object-detection.component.html",
  styleUrls: ["./video-object-detection.component.scss"]
})
export class VideoObjectDetectionComponent implements OnInit, OnDestroy {
  public files = [];
  private onDestroy$ = new Subject();

  constructor(
    private detectionService: VideoObjectDetectionService,
    private cdr: ChangeDetectorRef
  ) {}

  getFile(file: File) {
    const newFile: FileObjectInterface = new FileDetectionObject();
    this.files.push(newFile);
    this.files[this.files.length - 1].isShowProgressBar = true;

    this.detectionService
      .sendFile(file, newFile.id)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
        (data: { id: string }) => {
          this.detectionService.changeStatusProgress(this.files, data.id);
        },
        err => {
          console.log(err);
        }
      );
  }

  ngOnInit() {
    this.detectionService
      .getFileDetected()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result: { link: string; id: string }) => {
        this.detectionService.changeStateVideo(
          this.files,
          result.link,
          result.id
        );
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
