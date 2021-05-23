import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./User";

@Injectable({
    providedIn: 'root'
  })
export class Token {
    constructor(private http: HttpClient) { }
    token():any{
        const headers = new Headers();
        let optiosHeader = new HttpHeaders({
            'Authorization': 'Bearer '+window.localStorage.getItem("token")
         });
         let options = {
            headers: optiosHeader
         }
         return options;
      }

  }