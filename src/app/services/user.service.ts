
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';
import { UserLog } from '../model/UserLog';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators"; 
import { Session } from '../model/Session';
import { UserState } from '../model/UserState';
import { Token } from '../model/Token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string =  `${environment.HOST}api/`;

  constructor(private http: HttpClient, private token:Token) { }

  login(user:UserLog)  {
    return this.http.post<Session>(`${this.url}login`, user);
  }


  consultUsers():any{
    let options=this.token.token();
    return this.http.get<any>(`${this.url}users`, options);;
  }

  consultUser(id:number):any{
    let options=this.token.token();
    return this.http.get<any>(`${this.url}users/${id}`, options);;
  }

  save(user:User, edit:boolean){
    let options=this.token.token();
    if(edit){
      return this.http.put(`${this.url}users/${user.id}`, user, options);
    }
    else{
      return this.http.post(`${this.url}users`, user, options);
    }
  }

  uploadPhoto(){
    let options=this.token.token();
    let user=new User();
    user.id=2;
    user.photo="ertyuioiuytgrfdes";
    return this.http.post(`${this.url}user/update/photo`, user, options);
  }

  import(file:any){
    let options=this.token.token();
    return this.http.post(`${this.url}import`,file, options); 
  }

  changeState(id:number, user:UserState){
    let options=this.token.token();
    return this.http.put(`${this.url}users/${id}`, user, options);
  }
 
  addRoles(roles:string[], id:number){
    let options=this.token.token();
     return this.http.put(`${this.url}users/${id}`, roles, options)
  }
  

}
