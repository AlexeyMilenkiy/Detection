import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

import { socket } from "./main.service";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ImagePredictionService {
  public prediction = new Subject();

  constructor(private http: HttpClient) {
    this.fileRecognized();
  }

  sendFile(file: File, id: number) {
    const formData = new FormData();
    formData.append("image", file, file.name);
    formData.append("id", `${id}`);
    return this.http.post(`${environment.BASE_URL}/image-prediction`, formData);
  }

  fileRecognized() {
    socket.on(
      "image-prediction-end",
      (data: { data: string; link: string; id: string }) => {
        this.prediction.next(data);
      }
    );
  }

  getFileRecognized(): Observable<any> {
    return this.prediction.asObservable();
  }
}
