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


  consultID(id:number):any{
    let options=this.token.token();
    return this.http.get<any>(`${this.url}events/${id}`, options);
  }

  addEdit(event:Events, edit:boolean){
    let options=this.token.token();
    if(edit)
      return this.http.put(`${this.url}events/${event.id}`, event, options);
    else
      return this.http.post(`${this.url}events`, event, options);
  }

  remove(id:number){
    let options=this.token.token();
    return this.http.delete(`${this.url}events/${id}`, options);
  }
 

}