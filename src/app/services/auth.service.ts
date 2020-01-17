import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';

const url ='api/v1/identity'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: User;
  redirectUrl: string;
  constructor(private http: HttpClient, private router: Router) {

    if (this.isLoggedIn()) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    } else {
      this.currentUser = {
        Username: '',
        Password: '',
        Email: '',
        Token: ''
      }
    }
  }
  isLoggedIn() {
    return localStorage.getItem('currentUser') != null;
  }
  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('login');
  }

  login() {
    
    let params =
    {
      Username: this.currentUser.Username,
      Password: this.currentUser.Password
    };
    return this.http.post(`${url}/login`, params);
  }
  register(entity: any )
  {
    return this.http.post(`${url}/register`, entity);
  }
  

}