import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  signup(user: User) {
    this.http
      .post<User>('https://localhost:5001/Users', user)
      .subscribe((response) => {
        return response;
      });
  }
}
