import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Message } from '../models/message.model';
import { SecurityService } from '../shared/security/security.service';
const API_ENDPOINT = 'messages/';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[] = [];
  apiUrl: string = 'https://localhost:5001/';

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200',
    }).set('Authorization', 'Bearer ' + this.securityService.securityObject.bearerToken),
  };

  constructor(private http: HttpClient, private securityService: SecurityService) {
    this.apiUrl = this.apiUrl + API_ENDPOINT;
  }
  getMessages() {
    return this.http
      .get<Message[]>(this.apiUrl, this.httpOptions)
      .subscribe((response) => {
        return response;
      });
  }

  addMessage(form: NgForm) {
    console.log(this.messages);
    const value = form.value;
    this.messages.push(
      new Message(1, value.messageInputText, new Date())
    );
  }
}
