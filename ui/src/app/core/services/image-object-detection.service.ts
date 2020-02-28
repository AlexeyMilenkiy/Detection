import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

import { socket } from "./main.service";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ImageObjectDetectionService {
  public detected = new Subject();

  constructor(private http: HttpClient) {
    this.fileDetected();
  }

  sendFile(file: File, id: number) {
    const formData = new FormData();
    formData.append("image", file, file.name);
    formData.append("id", `${id}`);
    return this.http.post(
      `${environment.BASE_URL}/image-object-detection`,
      formData
    );
  }

  fileDetected() {
    socket.on(
      "image-object-detection-end",
      (data: { data: string; link: string; id: string }) => {
        this.detected.next(data);
      }
    );
  }

  getFileDetected(): Observable<any> {
    return this.detected.asObservable();
  }
}
