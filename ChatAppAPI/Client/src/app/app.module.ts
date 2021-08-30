import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import { UsersComponent } from './users/users.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageBoxComponent } from './messages/message-box/message-box.component';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MessageInputComponent } from './messages/message-input/message-input.component';
import { PortalComponent } from './portal/portal.component';
import { HttpClientModule } from '@angular/common/http';

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
    FormsModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
