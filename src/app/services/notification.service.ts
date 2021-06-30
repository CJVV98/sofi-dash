import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Notification } from '../model/Notification';
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

  add(notification: Notification){
    let options=this.token.token();
    notification.event_id="0";
    return this.http.post(`${this.url}notifications`, notification,options);
  }

}
