import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Events } from '../model/Events';
import { Token } from '../model/Token';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  url: string =  `${environment.HOST}api/`;
  constructor(private http: HttpClient, private token:Token) { }

  consult():any{
    let options=this.token.token();
    return this.http.get<any>(`${this.url}events`, options);
  }

  add(event:Events){
    let options=this.token.token();

    return this.http.post(`${this.url}events`, event, options);
  }

  edit(event:Events){
    console.log(event);
    console.log("entrando");
    let options=this.token.token();
    return this.http.put(`${this.url}events/${event.id}`, event, options);
  }
 

}