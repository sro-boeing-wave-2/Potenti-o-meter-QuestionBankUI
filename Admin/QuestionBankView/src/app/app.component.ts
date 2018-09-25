import { Component, Inject, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { QuestionService } from '../service/question.service';
import { MCQRecord, MCQOption } from './Models/MCQRecord';
import { MMCQRecord, MMCQOption } from './Models/MMCQRecord';
import { QuestionviewComponent } from './questionview/questionview.component';

export interface QuestionType {
  value: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'QuestionBankView';
  public static dialogRef;
  @ViewChild('fileImportInput') fileImportInput: any;
  @ViewChild(QuestionviewComponent) inputComponent: QuestionviewComponent
  constructor(public dialog: MatDialog) {}

  openDialog() {
    AppComponent.dialogRef = this.dialog.open(DialogDataExampleDialog, {
    });
    const mcq = AppComponent.dialogRef.componentInstance.mcqQuestion.subscribe((result) => {
      this.inputComponent.Questions.push(result);
      this.inputComponent.dataSource.paginator = this.inputComponent.paginator;
    });
    const mmcq = AppComponent.dialogRef.componentInstance.mmcqQuestion.subscribe((result) => {
      this.inputComponent.Questions.push(result);
      this.inputComponent.dataSource.paginator = this.inputComponent.paginator;
    });
  }
}

@Component({
  selector: 'create-question-dialog',
  templateUrl: 'create-question-dialog.html',
  styleUrls: ['create-question-dialog.css']
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _questionService: QuestionService) {}
  fileupload = false;
  filename:string
  Questions: QuestionType[] = [
    {value: 'MCQ'},
    {value: 'MMCQ'},
  ];
  @Output() mcqQuestion = new EventEmitter<MCQRecord>();
  @Output() mmcqQuestion = new EventEmitter<MMCQRecord>();
  public selectedOption; postData;
  public csvRecords: any[] = [];
  public dataArr = [];

  @ViewChild('myInput')
  myInputVariable: ElementRef;

  showname(data){
    this.fileupload = true;
    this.filename = data.target.files[0].name;
    var text = [];
    var files = data.srcElement.files;

    if (this.isCSVFile(files[0])) {
      var input = data.target;
      var reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = (data) => {
        let csvData = reader.result;
        let csvRecordsArray = (csvData as string).split(/\r\n|\n/);
        let headersRow = this.getHeaderArray(csvRecordsArray);
        this.csvRecords = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      }
      reader.onerror = function() {
        alert('Unable to read ' + input.files[0]);
      };

    }
    else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  isCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  reset(){
    this.fileupload= false;
    this.myInputVariable.nativeElement.value="";
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = csvRecordsArr[0].split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
    headerArray.push(headers[j]);
    }
    return headerArray;
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    for (let i = 1; i < csvRecordsArray.length; i++) {
    let data = csvRecordsArray[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
    if (data.length == headerLength) {
      if(this.selectedOption=="MCQ")
      {
      var mcq: MCQRecord = new MCQRecord();
      mcq.questionText = data[0].trim();
      mcq.questionType = this.selectedOption;
      mcq.taxonomy = data[2].trim();
      mcq.difficultyLevel = data[6].trim();
      mcq.domain = data[1].trim();
      const options = data[3].replace('"','').replace('"','').split(",");
      for(let j=0;j<options.length;j++)
      {
        var option:MCQOption = new MCQOption();
        option.optionText= options[i];
        mcq.options.push(option);
      }
      const concepts = data[4].replace('"','').replace('"','').split(",");

      for(let k=0;k<concepts.length;k++){
        mcq.conceptTags.push(concepts[k]);
      }

      {
        var correctoption:MCQOption = new MCQOption;
        correctoption.optionText= data[5].trim();
        mcq.correctAnswer = correctoption;
      }
      this.dataArr.push(mcq);
      }
      else if(this.selectedOption=="MMCQ")
      {
        var mmcq: MMCQRecord = new MMCQRecord();
      mmcq.questionText = data[0].trim();
      mmcq.questionType = this.selectedOption;
      mmcq.taxonomy = data[2].trim();
      mmcq.difficultyLevel = data[6].trim();
      mmcq.domain = data[1].trim();
      const options = data[3].replace('"','').replace('"','').split(",");
      for(let j=0;j<options.length;j++)
      {
        var option:MMCQOption = new MMCQOption();
        option.optionText= options[i];
        mmcq.options.push(option);
      }
      const concepts = data[4].replace('"','').replace('"','').split(",");

      for(let k=0;k<concepts.length;k++){
        mmcq.conceptTags.push(concepts[k]);
      }
      const correctoptions = data[5].replace('"','').replace('"','').split(",");
      {
        var correctoption:MMCQOption = new MMCQOption;
        correctoption.optionText= correctoptions[i];
        mmcq.correctAnswer.push(correctoption);
      }
      this.dataArr.push(mmcq);
      }
      else
      {
        alert("Please select question type first");
        this.fileReset();
        this.fileupload = false;
      }
    }
    else
    {
      alert("Number of fields in Question number" +[i] +"is not equal to number of fields in header");
    }
      }
    return this.dataArr;
  }
  fileReset() {
    this.myInputVariable.nativeElement.value = "";
    this.csvRecords = [];
  }

  submit(){
    this.dataArr.forEach(element => {
      this._questionService.postQuestions(element).subscribe(result => {
        if(result.statusText == "OK")
        {
          this.postData = element;
          if(element.QuestionType=="MCQ")
          {
            this.mcqQuestion.emit(element);
            console.log("emitted MCQ");
            AppComponent.dialogRef.close();
          }
          else {
            this.mmcqQuestion.emit(this.postData);
            AppComponent.dialogRef.close();
          }
          console.log(result.statusText);
        }
      });
    });
  }
}

