import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MessageService } from './message.service';
import { SecurityService } from '../shared/security/security.service';

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

  constructor(private http: HttpClient, private securityService: SecurityService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getMessages();
    console.log(this.messageList)
  }

  getMessages() {
  //  console.log(this.messageService.getMessages())
  return this.messageService.getMessages().subscribe((data: Message[]) => {
     console.log(data);
     this.messageList = data;
   });
    
  }

  addMessage(newMessage: string) {
    this.messageList.push(new Message('1', newMessage, new Date()));
  }


}
