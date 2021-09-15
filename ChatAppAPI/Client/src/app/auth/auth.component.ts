import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  isLoginMode = true;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200',
    }),
  };
  constructor(private http: HttpClient) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnInit(): void {}

  registerUser(form: NgForm) {
    const usernameValue = form.value.usernameInput;
    const passwordValue = form.value.passwordInput;
    this.createUser({
      username: usernameValue,
      password: passwordValue,
    });
  }

  createUser(user: User) {
    console.log(user)
    this.http
      .post<User>('https://localhost:5001/Users', user, this.httpOptions)
      .subscribe((response) => {
        console.log("User register", response);
      });
  }
}
