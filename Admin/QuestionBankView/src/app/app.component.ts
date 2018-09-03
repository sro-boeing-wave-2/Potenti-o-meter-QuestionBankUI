import { Component, Inject, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { ListRange } from '@angular/cdk/collections';
import { QuestionService } from '../service/question.service';

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
      disableClose: true
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
  selectedOption: string;
  Questions: QuestionType[] = [
    {value: 'Multiple Choice Question'},
    {value: 'Multiple Answer Question'},
    {value: 'True False'},
    {value: 'Fill in the Blanks'}
  ];
  // public trueFalse = "True False";
  @ViewChild('fileImportInput') fileImportInput: any;
  public csvRecords: any[] = [];
  public dataArr = []

  close() {
    AppComponent.dialogRef.close();
  }
  Submit() {
    AppComponent.dialogRef.close();
    console.log(this.selectedOption);
    if(this.dataArr != null && this.selectedOption != null)
    {
    this._questionService.postQuestions(this.dataArr).subscribe(result => console.log(result.statusText));
    }
  }

  fileChangeListener($event: any): void {

    var text = [];
    var files = $event.srcElement.files;

    if (this.isCSVFile(files[0])) {
      var input = $event.target;
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

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }
  isCSVFile(file: any) {
    return file.name.endsWith(".csv");
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
    let data = csvRecordsArray[i].split(',');
    if (data.length == headerLength) {

      var csvRecord: CSVRecord = new CSVRecord();

      csvRecord.questionText = data[0].trim();
      for(let j=1;j<5;j++)
      {
        csvRecord.options.push(data[j].trim());
      }
      csvRecord.correctanswer = data[5].trim();
      csvRecord.difficultylevel = data[6].trim();
      csvRecord.domain = data[7].trim();
      csvRecord.concepttag = data[8].trim();
      csvRecord.questionType = this.selectedOption;
      console.log(csvRecord);
      this.dataArr.push(csvRecord);
      }
    else
    {
      alert("Number of fields in Question number {i} is not equal to number of fields in header");
    }
      }
    return this.dataArr;
  }

  fileReset() {
    this.fileImportInput.nativeElement.value = "";
    this.csvRecords = [];
  }
}

export class CSVRecord{

  public questionText: any;
  public options = [];
  public concepttag: any;
  public correctanswer: any;
  public difficultylevel: any;
  public domain: any;
  public questionType: any;
}
