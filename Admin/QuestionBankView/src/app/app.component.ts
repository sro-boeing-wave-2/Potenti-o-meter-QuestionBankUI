import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { QuestionService } from '../service/question.service';
import { MCQRecord, MCQOption } from './Models/MCQRecord';
import { MMCQRecord, MMCQOption } from './Models/MMCQRecord';

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
  constructor(public dialog: MatDialog) {}

  openDialog() {
    AppComponent.dialogRef = this.dialog.open(DialogDataExampleDialog, {
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
        // console.log(csvRecordsArray[0]);
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
    console.log(data);
    if (data.length == headerLength) {
      if(this.selectedOption=="MCQ")
      {
      var mcq: MCQRecord = new MCQRecord();
      mcq.QuestionText = data[0].trim();
      mcq.QuestionType = this.selectedOption;
      mcq.Taxonomy = data[2].trim();
      mcq.DifficultyLevel = data[6].trim();
      mcq.Domain = data[1].trim();
      const options = data[3].replace('"','').replace('"','').split(",");
      for(let j=0;j<options.length;j++)
      {
        var option:MCQOption = new MCQOption();
        option.OptionText= options[i];
        mcq.Options.push(option);
      }
      const concepts = data[4].replace('"','').replace('"','').split(",");

      for(let k=0;k<concepts.length;k++){
        mcq.ConceptTags.push(concepts[k]);
      }

      {
        var correctoption:MCQOption = new MCQOption;
        correctoption.OptionText= data[5].trim();
        mcq.CorrectAnswer = correctoption;
      }
      this.dataArr.push(mcq);
      }
      else if(this.selectedOption=="MMCQ")
      {
        var mmcq: MMCQRecord = new MMCQRecord();
      mmcq.QuestionText = data[0].trim();
      mmcq.QuestionType = this.selectedOption;
      mmcq.Taxonomy = data[2].trim();
      mmcq.DifficultyLevel = data[6].trim();
      mmcq.Domain = data[1].trim();
      const options = data[3].replace('"','').replace('"','').split(",");
      for(let j=0;j<options.length;j++)
      {
        var option:MMCQOption = new MMCQOption();
        option.OptionText= options[i];
        mmcq.Options.push(option);
      }
      const concepts = data[4].replace('"','').replace('"','').split(",");

      for(let k=0;k<concepts.length;k++){
        mmcq.ConceptTags.push(concepts[k]);
      }
      const correctoptions = data[5].replace('"','').replace('"','').split(",");
      {
        var correctoption:MMCQOption = new MMCQOption;
        correctoption.OptionText= correctoptions[i];
        mmcq.CorrectAnswer.push(correctoption);
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
    AppComponent.dialogRef.close();
    console.log(this.dataArr);
  }
}

