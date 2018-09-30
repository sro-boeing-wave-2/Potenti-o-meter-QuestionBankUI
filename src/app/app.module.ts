import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PapaParseModule } from 'ngx-papaparse';
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
import { AppComponent,  } from './app.component';
import {DialogDataExampleDialog, ImportQuestionbankComponent} from './import-questionbank/import-questionbank.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionviewComponent } from './questionview/questionview.component';
import { QuestionService } from '../service/question.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { DetailDialogComponent } from './dialogs/detail/detail.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { RouterModule, Routes, Router } from '@angular/router';


const appRoutes: Routes = [
  {
    path: 'import-questionbank',
    component: ImportQuestionbankComponent,
  },
  {
    path: '',
    redirectTo: '/import-questionbank',
    pathMatch: 'full',
  }
];


@NgModule({
  declarations: [
    AppComponent,
    DialogDataExampleDialog,
    QuestionviewComponent,
    AddDialogComponent,
    DetailDialogComponent,
    DeleteDialogComponent,
    ImportQuestionbankComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    FormsModule,
    MatChipsModule,
    MatIconModule,
    PapaParseModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatGridListModule,
    MatTableModule,
  ],
  providers: [QuestionService],
  bootstrap: [AppComponent],
  entryComponents: [DialogDataExampleDialog, AddDialogComponent, DetailDialogComponent, DeleteDialogComponent]
})
export class AppModule { }
