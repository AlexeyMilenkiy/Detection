import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ImagePredictionComponent } from "./core/pages/image-prediction/image-prediction.component";
import { ImageObjectDetectionComponent } from "./core/pages/image-object-detection/image-object-detection.component";
import { SidebarComponent } from "./core/components/sidebar/sidebar.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { ObjectFileComponent } from "./core/components/object-file/object-file.component";
import { NotFoundComponent } from "./core/pages/not-found/not-found.component";
import { VideoObjectDetectionComponent } from "./core/pages/video-object-detection/video-object-detection.component";
import { DropzoneComponent } from "./core/components/dropzone/dropzone.component";

@NgModule({
  declarations: [
    AppComponent,
    ImagePredictionComponent,
    ImageObjectDetectionComponent,
    SidebarComponent,
    ObjectFileComponent,
    NotFoundComponent,
    VideoObjectDetectionComponent,
    DropzoneComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
