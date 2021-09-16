import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppUser } from 'src/app/security/app-user';
import { AppUserAuth } from 'src/app/security/app-user-auth';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  securityObject: AppUserAuth = new AppUserAuth();
  constructor() {}

  login(entity: AppUser): Observable<AppUserAuth> {
    this.securityObject.username = entity.username;
    switch (entity.username.toLowerCase()) {
      case 'admin':
        this.securityObject.isAuthenticated = true;
        this.securityObject.canAccessChat = true;
        break;
      case 're':
        this.securityObject.isAuthenticated = true;
        this.securityObject.canAccessChat = true;
        break;

      default:
        this.securityObject.username = 'Invalid User Name or Password.';
        break;
    }

    return of(this.securityObject);
  }

  logout(): void {
    this.securityObject.init();
  }
}
