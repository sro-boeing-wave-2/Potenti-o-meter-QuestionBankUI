import {MAT_DIALOG_DATA, MatDialogRef, MatChipInputEvent} from '@angular/material';
import {Component, Inject, Output, EventEmitter} from '@angular/core';
import {QuestionService} from '../../../service/question.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {IMCQ} from '../../../service/mcq';
import { MCQRecord } from '../../Models/MCQRecord';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IMCQ,
              public dataService: QuestionService) { }
              visible = true;
              selectable = true;
              removable = true;
              addOnBlur = true;
              readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public domain: string ;
  public Difficulty: number;
  public Question: string;
  public concepts = [];
  public options = [];
  public CorrectAnswer:string;
  public postData= {} as MCQRecord;
  @Output() addedQuestion = new EventEmitter<MCQRecord>();

  submit() {
    // this.postData.domain = this.domain;
    // this.postData.difficultylevel = this.Difficulty;
    // this.postData.questionText = this.Question;
    // this.postData.correctOption = this.CorrectAnswer;
    // this.postData.ConceptTags = [...this.concepts];
    // this.postData.OptionList = [...this.options];
    // this.dataService.postQuestions(this.postData).subscribe(result => {
    //   if(result.statusText == "OK")
    //   {
    //     this.addedQuestion.emit(this.postData);
    //   }
    // });
    // this.dialogRef.close();
  }

  addConcept(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.concepts.push(value.trim());
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
      this.options.push({option: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeConcept(fruit): void {
    const index = this.concepts.indexOf(fruit);

    if (index >= 0) {
      this.concepts.splice(index, 1);
    }
  }

  removeOptions(fruit): void {
    const index = this.options.indexOf(fruit);

    if (index >= 0) {
      this.options.splice(index, 1);
    }
  }
}
