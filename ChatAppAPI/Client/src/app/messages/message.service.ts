import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError, interval } from 'rxjs';
import { Message } from '../models/message.model';
import { MessageReturn } from '../models/message-return.model';
const API_ENDPOINT = 'messages/';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[] = [];
  apiUrl: string = 'https://localhost:5001/';

  constructor(
    private http: HttpClient
  ) {
    this.apiUrl = this.apiUrl + API_ENDPOINT;
  }
  getMessages() {
    return this.http.get<MessageReturn[]>(this.apiUrl).pipe(
      map((data: MessageReturn[]) => {
        return data;
      }),
      catchError((err) => {
        return throwError('Unable to display messages', err);
      })
    );
  }

  addMessage(form: NgForm) {
    const userObject = JSON.parse(localStorage.getItem('AuthObject')!);
    
    const value = { userId: userObject.userId, text: form.value.messageInputText };
    console.log(value);
    return this.http.post<MessageReturn>(this.apiUrl, value).pipe(
      map((data: MessageReturn) => {
        return {
          username: userObject.userName,
          text: data.text,
          dateCreated: data.dateCreated
        }
      })
    );

    // console.log(this.messages);
    // const value = form.value;
    // this.messages.push(new Message('1', value.messageInputText, new Date()));
  }
}
