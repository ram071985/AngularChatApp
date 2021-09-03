import { Component, OnInit } from '@angular/core';
import { Message } from './models/message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messageList: Message[] = [];

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200',
    }),
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getMessages();
    console.log(this.messageList)
  }

  getMessages() {
    return this.http
      .get<Message[]>('https://localhost:5001/Messages', this.httpOptions)
      .subscribe((response) => {
        this.messageList = response;
      });
  }

  addMessage(newMessage: string) {
    this.messageList.push(new Message(1, newMessage, new Date()));
  }
}
