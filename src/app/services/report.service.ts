import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Notification } from '../model/Notification';
import { Token } from '../model/Token';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  url: string =  `${environment.HOST}api/`;
  constructor(private http: HttpClient, private token:Token) { }

  consultScore(id:number):any{
    let body = {
        "user_id": id
      };
      return this.http.post(`${this.url}articlesScoreReport`, body);
  }

  add(notification: Notification){
    let options=this.token.token();
    return this.http.post(`${this.url}notifications`, notification,options);
  }

}
