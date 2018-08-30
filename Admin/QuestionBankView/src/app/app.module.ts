import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatChipsModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatGridListModule
} from '@angular/material';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
