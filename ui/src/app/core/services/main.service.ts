import { Injectable } from "@angular/core";
import openSocket from "socket.io-client";

import { environment } from "../../../environments/environment";
import { FileObjectInterface } from "../models/imagesModels";

export const socket = openSocket(environment.BASE_URL);

@Injectable({
  providedIn: "root"
})
export class MainService {
  constructor() {}

  changeStatusProgress(files: Array<FileObjectInterface>, id: string) {
    files.forEach(item => {
      if (item.id === +id) {
        item.value = 20;
        item.progress = "Recognition...";
      }
      const intervalId = setInterval(() => {
        item.value += 1;
        if (item.value >= 90) clearInterval(intervalId);
      }, 10);
    });
  }

  changeStateImage(
    files: Array<FileObjectInterface>,
    link: string,
    id: string,
    data?: []
  ) {
    files.forEach(item => {
      if (item.id === +id) {
        item.value = 100;
        setTimeout(() => {
          item.isShowProgressBar = false;
          item.imgLink = link;
          if (data) {
            item.data = data;
          }
        });
      }
    });
  }
}
