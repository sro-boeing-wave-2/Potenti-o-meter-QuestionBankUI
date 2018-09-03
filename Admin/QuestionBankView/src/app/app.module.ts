import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatDialogModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatChipsModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatTableModule
} from '@angular/material';
import { AppComponent, DialogDataExampleDialog } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionviewComponent } from './questionview/questionview.component';
import { QuestionService } from '../service/question.service';
import { HttpModule } from '@angular/http';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogDataExampleDialog,
    QuestionviewComponent,
    AddDialogComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatTableModule
  ],
  providers: [QuestionService],
  bootstrap: [AppComponent],
  entryComponents: [DialogDataExampleDialog, AddDialogComponent]
})
export class AppModule { }
