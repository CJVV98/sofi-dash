import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Token } from '../model/Token';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  url: string =  `${environment.HOST}api/`;
  constructor(private http: HttpClient, private token:Token) { }

  consult():any{
    let options=this.token.token();
    return this.http.get<any>(`${this.url}notifications`, options);
  }

}
