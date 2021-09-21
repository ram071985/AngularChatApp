import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import { UsersComponent } from './users/users.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageBoxComponent } from './messages/message-box/message-box.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatButton, MatButtonModule} from '@angular/material/button';
import { MessageInputComponent } from './messages/message-input/message-input.component';
import { PortalComponent } from './portal/portal.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { httpInterceptorProviders } from './shared/http-interceptors/interceptor-providers';

const appRoutes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '',
    component: PortalComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'canAccessChat'}
  },
];
@NgModule({
  declarations: [
    PortalComponent,
    AppComponent,
    AuthComponent,
    UsersComponent,
    MessagesComponent,
    MessageBoxComponent,
    MessageInputComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
