import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {QuestionService} from '../../../service/question.service';
import {FormControl, Validators} from '@angular/forms';
import {IMCQ} from '../../../service/mcq';

@Component({
  selector: 'app-detail.dialog',
  templateUrl: '../../dialogs/detail/detail.dialog.html',
  styleUrls: ['../../dialogs/detail/detail.dialog.css']
})

export class DetailDialogComponent {
  constructor(public dialogRef: MatDialogRef<DetailDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IMCQ,
              public dataService: QuestionService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.dataService.postQuestions(this.data);
  }
}
