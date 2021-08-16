import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortalComponent } from './portal/portal.component';
import { AuthComponent } from './portal/auth/auth.component';
import { UsersComponent } from './portal/users/users.component';
import { MessagesComponent } from './portal/messages/messages.component';
import { MessageBoxComponent } from './portal/messages/message-box/message-box.component';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MessageInputComponent } from './portal/messages/message-input/message-input.component';

@NgModule({
  declarations: [
    AppComponent,
    PortalComponent,
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
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
