import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  public getToken(): string {
    const userJson= localStorage.getItem('token');
    return userJson !== null ? JSON.parse(userJson) : "expire";
  }
  public isAuthenticated(): boolean {
    const token = this.getToken();
    return tokenNotExpired(token);
  }
}