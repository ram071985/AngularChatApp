import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.model';
import { interval } from 'rxjs';
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
  messageInputText: string = "";

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200',
    }),
  };

  constructor(private http: HttpClient, private securityService: SecurityService, private messageService: MessageService) {}

  ngOnInit(): void {
    setInterval(() => {
      this.getMessages()
    }, 2000);
    this.messageInputText = "";

  }

  getMessages() {
  return this.messageService.getMessages().subscribe((data: MessageReturn[]) => {
     this.messageReturnList = data;
   });
    
  }

  // addMessage(form: NgForm) {
  //   this.messageService.addMessage(form).subscribe((data: Message) => {
  //     console.log(data)
  //    // this.messageReturnList.push({})
  //   })
  //  // this.messageList.push(new Message('1', newMessage, new Date()));
  // }


}
