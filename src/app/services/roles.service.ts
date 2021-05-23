import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Role } from '../model/Role';
import { Token } from '../model/Token';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  url: string =  `${environment.HOST}api/`;
  constructor(private http: HttpClient, private token:Token) { }

  consult():any{
    let options=this.token.token();
    return this.http.get<any>(`${this.url}roles`, options);;
  }


  save(rol:Role, edit:boolean){
    let options=this.token.token();
    if(edit)
      return this.http.put(`${this.url}roles/${rol.id}`, rol, options);
    else
      return this.http.post(`${this.url}roles`, rol, options);
  }


}
