import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserReturn } from '../models/user-return.model';
const API_ENDPOINT = 'user/';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl: string = 'https://localhost:5001/';

  constructor(private http: HttpClient) {
    this.apiUrl = this.apiUrl + API_ENDPOINT;
  }

  getUsers() {
    return this.http.get<UserReturn[]>(this.apiUrl).pipe(
      map((data: UserReturn[]) => {
        return data;
      })
    );
  }
}
