import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { AppUser } from 'src/app/security/app-user';
import { AppUserAuth } from 'src/app/security/app-user-auth';
import { MessageService } from '../messaging/message.service';
const API_ENDPOINT = 'security/';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  securityObject: AppUserAuth = new AppUserAuth();
  apiUrl: string = 'https://localhost:5001/';

  constructor(private http: HttpClient, private msgService: MessageService) {
    this.apiUrl = this.apiUrl + API_ENDPOINT;
  }

  login(entity: AppUser): Observable<AppUserAuth> {
    // Delete userId property for posting
    delete entity.userId;

    return this.http
      .post<AppUserAuth>(this.apiUrl + 'login', entity)
      .pipe(
        tap((res) => {
          Object.assign(this.securityObject, res);
        }),
      //  catchError(this.handleError())
      );
  }

  // handleError<T>(operation = 'operation', msg = '', result?: T) {
  //   // Add error messages to service
  //   return (error: any): Observable<T> => {
  //     msg = "Status Code: " + error.status + " - " + msg || "";

  //     console.log(msg + " " + JSON.stringify(error));

  //     // Set the last exception generated

  //     switch (error.status) {
  //       case 400: // Model state error
  //       if (error.error) {
  //         // Add all error messages to the validationMessages list
  //         Object.keys(error.error.errors)
  //         .map(keyName => this.)
  //       }
  //     }
  //   }
  // }

  logout(): void {
    this.securityObject.init();
  }
}
