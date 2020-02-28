import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { ImageObjectDetectionService } from "../../services/image-object-detection.service";
import { MainService } from "../../services/main.service";
import {
  FileDetectionObject,
  FileObjectInterface
} from "../../models/imagesModels";

@Component({
  selector: "app-image-object-detection",
  templateUrl: "./image-object-detection.component.html",
  styleUrls: ["./image-object-detection.component.scss"]
})
export class ImageObjectDetectionComponent implements OnDestroy, OnInit {
  public files = [];
  private onDestroy$ = new Subject();

  constructor(
    private detectionService: ImageObjectDetectionService,
    private mainService: MainService,
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
          this.mainService.changeStatusProgress(this.files, data.id);
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
      .subscribe((result: { data: string; link: string; id: string }) => {
        this.mainService.changeStateImage(this.files, result.link, result.id);
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
