export class FileDetectionObject {
  progress: string;
  value: number;
  isShowProgressBar: boolean;
  imgLink?: string;
  videoLink?: string;
  id: number;

  constructor() {
    this.progress = "Loading";
    this.value = 0;
    this.isShowProgressBar = false;
    this.imgLink = "";
    this.videoLink = "";
    this.id = new Date().getTime();
  }
}

export class ImagePredictionObject extends FileDetectionObject {
  data: null | [];
  constructor() {
    super();
    this.data = null;
  }
}

export interface FileObjectInterface {
  progress: string;
  value: number;
  isShowProgressBar: boolean;
  imgLink?: string;
  videoLink?: string;
  id: number;
  data?: null | [];
}
