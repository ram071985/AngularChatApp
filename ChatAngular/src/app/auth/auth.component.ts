import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AppUser } from '../security/app-user';
import { AppUserAuth } from '../security/app-user-auth';
import { SecurityService } from '../shared/security/security.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  user: AppUser = new AppUser();
  securityObject: AppUserAuth | undefined;
  returnUrl: string | undefined;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200',
    }),
  };
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private securityService: SecurityService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')!;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const usernameValue = form.value.usernameInput;
    const passwordValue = form.value.passwordInput;
    if (!form.valid) {
      return;
    }
    if (this.isLoginMode) {
     
      this.securityObject?.init();
      this.securityService
        .login({ username: usernameValue, password: passwordValue })
        .subscribe((res: any) => {
          localStorage.setItem('AuthObject', JSON.stringify(res.value));
          this.securityObject = res;
          if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
          }
        });
    } else {
      this.authService.signup({ username: usernameValue, password: passwordValue })
      this.isLoginMode = true;
    }
    form.reset();
  }

//   logout(): void {

//  //   this.securityService.logout();
//     this.securityObject = this.securityService.securityObject;
//     localStorage.removeItem('AuthObject');
//   }

  // onSubmit(form: NgForm) {
  //   if (!form.valid) {
  //     return;
  //   }
  //   const usernameValue = form.value.usernameInput;
  //   const passwordValue = form.value.passwordInput;
  //   // this.createUser({
  //   //   username: usernameValue,
  //   //   password: passwordValue,
  //   // });

  //   // if (this.isLoginMode) {
  //   // } else {
  //   //   this.authService
  //   //     .signup({
  //   //       username: usernameValue,
  //   //       password: passwordValue,
  //   //     })
  //   //     .subscribe((resData) => {
  //   //       console.log(resData);
  //   //     });
  //   // }

  //   form.reset();
  // }

  // createUser(user: User) {
  //   console.log(user);
  //   this.http
  //     .post<User>('https://localhost:5001/Users', user, this.httpOptions)
  //     .subscribe((response) => {
  //       console.log('User register', response);
  //     });
  // }
}
