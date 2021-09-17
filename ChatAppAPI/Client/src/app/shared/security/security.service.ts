import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { AppUser } from 'src/app/security/app-user';
import { AppUserAuth } from 'src/app/security/app-user-auth';

const API_ENDPOINT = 'security/';
const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': 'http://localhost:4200',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  securityObject: AppUserAuth = new AppUserAuth();
  apiUrl: string = 'https://localhost:5001/';

  constructor(private http: HttpClient) {
    this.apiUrl = this.apiUrl + API_ENDPOINT;
  }

  login(entity: AppUser): Observable<AppUserAuth> {
    // Delete userId property for posting
    delete entity.userId;

    return this.http
      .post<AppUserAuth>(this.apiUrl + 'login', entity, httpOptions)
      .pipe(
        tap((res) => {
          console.log(res);
          Object.assign(this.securityObject, res);
        })
      );
  }

  logout(): void {
    this.securityObject.init();
  }
}
