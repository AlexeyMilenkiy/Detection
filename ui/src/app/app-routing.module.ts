import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ImagePredictionComponent } from "./core/pages/image-prediction/image-prediction.component";
import { ImageObjectDetectionComponent } from "./core/pages/image-object-detection/image-object-detection.component";
import { NotFoundComponent } from "./core/pages/not-found/not-found.component";
import { VideoObjectDetectionComponent } from "./core/pages/video-object-detection/video-object-detection.component";

const routes: Routes = [
  { path: "", redirectTo: "image-prediction", pathMatch: "full" },
  { path: "image-prediction", component: ImagePredictionComponent },
  { path: "image-object-detection", component: ImageObjectDetectionComponent },
  { path: "video-object-detection", component: VideoObjectDetectionComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
