import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-dropzone",
  templateUrl: "./dropzone.component.html",
  styleUrls: ["./dropzone.component.scss"]
})
export class DropzoneComponent {
  @Output() sendFile = new EventEmitter<File>();

  constructor() {}

  dropzoneHandler(files: FileList) {
    const fileToUpload = files.item(0);
    this.sendFile.emit(fileToUpload);
  }
}
