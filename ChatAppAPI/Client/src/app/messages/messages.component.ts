import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.model';
import { MessageReturn } from '../models/message-return.model';
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
  messageReturnList: MessageReturn[] = [];

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200',
    }),
  };

  constructor(private http: HttpClient, private securityService: SecurityService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages() {
  //  console.log(this.messageService.getMessages())
  return this.messageService.getMessages().subscribe((data: MessageReturn[]) => {
     console.log(data);
     this.messageReturnList = data;
   });
    
  }

  addMessage(form: NgForm) {
    this.messageService.addMessage(form)
   // this.messageList.push(new Message('1', newMessage, new Date()));
  }


}
