import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, Output, EventEmitter} from '@angular/core';
import {QuestionService} from '../../../service/question.service';
import {FormControl, Validators} from '@angular/forms';
import {IMCQ} from '../../../service/mcq';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import {FormBuilder, FormGroup,FormArray} from "@angular/forms";

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-detail.dialog',
  templateUrl: '../../dialogs/detail/detail.dialog.html',
  styleUrls: ['../../dialogs/detail/detail.dialog.css']
})

export class DetailDialogComponent {
  createForm:FormGroup;
  @Output() editedQuestion = new EventEmitter<IMCQ>();
  constructor(public dialogRef: MatDialogRef<DetailDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              public dataService: QuestionService) {}

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  SaveData(data){
    this.dataService.editQuestions(data.questionId, data).subscribe(result => {
      if(result.statusText == "OK")
      {
        this.editedQuestion.emit(data);
      }
    });
    this.dialogRef.close();
  }

  addConcept(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.data.row.conceptTags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  addOption(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.data.row.optionList.push({option: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeConcept(fruit): void {
    const index = this.data.row.conceptTags.indexOf(fruit);

    if (index >= 0) {
      this.data.row.conceptTags.splice(index, 1);
    }
  }

  removeOptions(fruit): void {
    const index = this.data.row.optionList.indexOf(fruit);

    if (index >= 0) {
      this.data.row.optionList.splice(index, 1);
    }
  }
  }
