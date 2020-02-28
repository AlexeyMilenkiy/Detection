import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { FileObjectInterface } from "../models/imagesModels";

import { socket } from "./main.service";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class VideoObjectDetectionService {
  public detected = new Subject();

  constructor(private http: HttpClient) {
    this.fileDetected();
  }

  sendFile(file: File, id: number) {
    const formData = new FormData();
    formData.append("video", file, file.name);
    formData.append("id", `${id}`);
    return this.http.post(
      `${environment.BASE_URL}/video-object-detection`,
      formData
    );
  }

  fileDetected() {
    socket.on("video-object-detection-end", data => {
      this.detected.next(data);
    });
  }

  getFileDetected(): Observable<any> {
    return this.detected.asObservable();
  }

  changeStatusProgress(files: Array<FileObjectInterface>, id: string) {
    files.forEach(item => {
      if (item.id === +id) {
        item.value = 20;
        item.progress = "Recognition...";
      }
      const intervalId = setInterval(() => {
        item.value += 1;
        if (item.value >= 90) clearInterval(intervalId);
      }, 5000);
    });
  }

  changeStateVideo(
    files: Array<FileObjectInterface>,
    link: string,
    id: string
  ) {
    files.forEach(item => {
      if (item.id === +id) {
        item.value = 100;
        setTimeout(() => {
          item.isShowProgressBar = false;
          item.videoLink = link;
        });
      }
    });
  }
}
