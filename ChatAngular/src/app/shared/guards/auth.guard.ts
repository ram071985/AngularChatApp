import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { SecurityService } from '../security/security.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

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

    let claimValue = this.securityService.securityObject;
    let isAuth =
      this.securityService.securityObject.isAuthenticated &&
      this.securityService.hasClaim(claimType, claimValue);
      //

    if (isAuth) {
      return true;
    } else {
      this.router.navigate(['auth'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
  }
}
