import { Component, Input } from "@angular/core";
import { FileObjectInterface } from "../../models/imagesModels";

@Component({
  selector: "app-object-file",
  templateUrl: "./object-file.component.html",
  styleUrls: ["./object-file.component.scss"]
})
export class ObjectFileComponent {
  @Input() item: FileObjectInterface;
  public arrKeys = [];

  constructor() {}

  ngDoCheck() {
    if (this.item.data) {
      this.arrKeys = Object.keys(this.item.data);
    }
  }
}
