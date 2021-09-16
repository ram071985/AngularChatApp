import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { SecurityService } from '../security/security.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private securityService: SecurityService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let claimType: string = route.data['claimType'];

    let auth = localStorage.getItem('AuthObject');
    if (auth) {
      Object.assign(this.securityService.securityObject, JSON.parse(auth));
    }
    let isAuth = this.securityService.securityObject.isAuthenticated;
    let isPropTrue = this.securityService.securityObject.getValueOfProperty(
      this.securityService.securityObject,
      claimType
    );

    return isAuth && isPropTrue;
  }
}
