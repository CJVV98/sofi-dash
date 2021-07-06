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
    let options=this.token.token();
    let body = {
        "userid": id
      };
      return this.http.post(`${this.url}articlesScoreReport`, body, options);
  }

  add(notification: Notification){
    let options=this.token.token();
    return this.http.post(`${this.url}notifications`, notification,options);
  }

  consultFavorite(id:number):any{
    let options=this.token.token();
    let body = {
        "userid": id
      };
      return this.http.post(`${this.url}favoritesReport`, body, options);
 
  }


  consultUser(id:number):any{
    let options=this.token.token();
    let body = {
        "userid": id
      };
      return this.http.post(`${this.url}usersRegisteredReport`, body, options);
  }

  consultKeyword(id:number):any{
    let options=this.token.token();
    return this.http.get<any>(`${this.url}keywordsArticles`, options);
  }
}
