import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import {
  ImagePredictionObject,
  FileObjectInterface
} from "../../models/imagesModels";
import { MainService } from "../../services/main.service";
import { ImagePredictionService } from "../../services/image-prediction.service";

@Component({
  selector: "app-image-prediction",
  templateUrl: "./image-prediction.component.html",
  styleUrls: ["./image-prediction.component.scss"]
})
export class ImagePredictionComponent implements OnInit, OnDestroy {
  public files = [];
  private onDestroy$ = new Subject();

  constructor(
    private predictionService: ImagePredictionService,
    private mainService: MainService,
    private cdr: ChangeDetectorRef
  ) {}

  getFile(file: File) {
    const newFile: FileObjectInterface = new ImagePredictionObject();
    this.files.push(newFile);
    this.files[this.files.length - 1].isShowProgressBar = true;

    this.predictionService
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
    this.predictionService
      .getFileRecognized()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result: { data: []; link: string; id: string }) => {
        this.mainService.changeStateImage(
          this.files,
          result.link,
          result.id,
          result.data
        );
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
