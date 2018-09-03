import { Component, OnInit, ViewChild} from '@angular/core';
import { QuestionService } from '../../service/question.service';
import {MatPaginator, MatTableDataSource, MatDialog} from '@angular/material';
import { IMCQ } from '../../service/mcq';
import { AddDialogComponent } from '../dialogs/add/add.dialog.component';
import { DetailDialogComponent } from '../dialogs/detail/detail.dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete/delete.dialog.component';

@Component({
  selector: 'app-questionview',
  templateUrl: './questionview.component.html',
  styleUrls: ['./questionview.component.css']
})
export class QuestionviewComponent implements OnInit {
  public Questions = [];
  constructor(private _questionService: QuestionService, public dialog: MatDialog) { }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource = new MatTableDataSource<IMCQ>(this.Questions);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this._questionService.getQuestions()
    .subscribe(data => {this.Questions.push(...data.json()); this.dataSource.paginator = this.paginator;});
    console.log(this.Questions);
  }

  addNew(issue: IMCQ) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {issue}
  });
  }

  selectRow(row) {
    const dialogRef = this.dialog.open(DetailDialogComponent ,{
      data: {row}
    })
  }

  deleteItem(i: number, row: IMCQ) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {row}
    });
  }
}
