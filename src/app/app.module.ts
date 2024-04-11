import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as fabric from 'fabric';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasDrawingComponent } from './canvasdrawing/canvasdrawing.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    CanvasDrawingComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule 
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
