import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
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
  private hasChanged = new BehaviorSubject<number>(0);
  securityReset = this.hasChanged.asObservable();

  constructor(private http: HttpClient, private msgService: MessageService) {
    this.apiUrl = this.apiUrl + API_ENDPOINT;
  }

  hasClaim(claimType: any, claimValue?: any): boolean {
    return this.isClaimValid(claimType, claimValue);
  }

  private isClaimValid(claimType: string, claimValue?: string): boolean {
    let ret: boolean = false;
    let auth: AppUserAuth | undefined;

    // Retrieve security object
    auth = this.securityObject;

    if (auth) {
      // See if the claim type has a value
      // *hasClaim="'claimType:value'"
      if (claimType.indexOf(':') >= 0) {
        let words: string[] = claimType.split(':');
        claimType = words[0].toLowerCase();
        claimValue = words[1];
      } else {
        claimType = claimType.toLowerCase();
        // Either get the claim value, or assume 'true'
        claimValue = claimValue ? claimValue : 'true';
      }
      // Attempt to find the claim
      ret =
        auth.claims.find(
          (c) => c.claimType.toLowerCase() == claimType && c.claimValue
        ) != null;
    }
    return ret;
  }

  login(entity: AppUser): Observable<AppUserAuth> {
    // Delete userId property for posting
    delete entity.userId;

    return this.http.post<AppUserAuth>(this.apiUrl + 'login', entity).pipe(
      tap((res) => {
        Object.assign(this.securityObject, res);

        // Inform everyone the security object has changed
        this.hasChanged.next(0);
      })
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

  logout(entity: AppUser) {
    console.log('click');

    return this.http.post<AppUser>(this.apiUrl + 'logout', entity).pipe(
      tap((res) => {
        //Inform everone the security object has changed
        this.securityObject.init();

        // Inform everyone the security object has changed
        this.hasChanged.next(0);
      })
      //  catchError(this.handleError())
    );
  }
}
