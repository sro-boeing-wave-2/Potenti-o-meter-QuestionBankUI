import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, RequestOptions } from '@angular/http';
import { IMCQ } from './mcq';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private _url:string = "https://localhost:44334/api/questions/";
  constructor(private http:Http) { }

  getQuestions()
  {
    return this.http.get(this._url);
  }

  postQuestions(Question)
  {
    return this.http.post(this._url,Question);
  }
}
