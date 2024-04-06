import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasDrawingComponent } from './canvasdrawing/canvasdrawing.component';

const routes: Routes = [
  {
    path:'canvasdrawing', component:CanvasDrawingComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
