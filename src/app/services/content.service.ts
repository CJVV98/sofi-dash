import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article } from '../model/Article';
import { Keyword } from '../model/Keyword';
import { Permission } from '../model/Permission';
import { Token } from '../model/Token';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  url: string =  `${environment.HOST}api/`;
  constructor(private http: HttpClient, private token:Token) { }

  consultKeyword():any{
    let options=this.token.token();
    return this.http.get<any>(`${this.url}keywords`, options);
  }

  addKeyword(keyword: Keyword){
    let options=this.token.token();
    return this.http.post(`${this.url}keywords`, keyword, options);
  }

  addArticle(article: Article){
    let options=this.token.token();
    return this.http.post(`${this.url}articles`, article, options);
  }

  consultArticles():any{
    let options=this.token.token();
    return this.http.get<any>(`${this.url}articles`, options);
  }
  
  getArticle(id:number, route:String):any{
    let options=this.token.token();
    return this.http.get<any>(`${this.url}articles/${id}`, options);
  }


  editVisibilityArticle(id:number, visibility:string){
    let options=this.token.token();
    let body = {
      "visibility": visibility,
    };
    return this.http.put(`${this.url}articles/${id}`, body, options);
  }

  
}