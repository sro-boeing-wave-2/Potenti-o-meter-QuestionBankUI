import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, RequestOptions } from '@angular/http';
import { IMCQ } from './mcq';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private _url:string = "http://13.126.26.172/questionbank/";
  constructor(private http:Http) { }

  getQuestions()
  {
    return this.http.get(this._url);
  }

  postQuestions(Question)
  {
    return this.http.post(this._url,Question);
  }
  deletetQuestions(id)
  {
    var appendedString = this._url + "id/" + id;
    return this.http.delete(appendedString);
  }
  editQuestions(id, Question){
    var appendedString = this._url + id;
    return this.http.put(appendedString,Question)
  }
}
