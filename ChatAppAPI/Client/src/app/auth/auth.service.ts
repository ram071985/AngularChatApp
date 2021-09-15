import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200',
    }),
  };
  constructor(private http: HttpClient) {}
  signup(user: User) {
    this.http
      .post<User>('https://localhost:5001/Users', user, this.httpOptions)
      .subscribe((response) => {
        console.log('User register', response);
      });
  }
}
