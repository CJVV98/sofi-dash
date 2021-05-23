import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Permission } from '../model/Permission';
import { Token } from '../model/Token';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  url: string =  `${environment.HOST}api/`;
  constructor(private http: HttpClient, private token:Token) { }

  consult():any{
    let options=this.token.token();
    return this.http.get<any>(`${this.url}permissions`,  options);
  }

  add(permission:Permission, edit:boolean){
    let options=this.token.token();
    if(edit)
      return this.http.put(`${this.url}permissions/${permission.id}`, permission, options);
    else
      return this.http.post(`${this.url}permissions`, permission, options);

  }


  delete(id:number){
    let options=this.token.token();
    return this.http.delete(`${this.url}permissions/${id}`, options)
  }

  

}
