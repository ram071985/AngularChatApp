import { Component, OnInit } from '@angular/core';
import { Message } from './models/message.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messageList: Message[] = [new Message(1, 'yo', new Date())];
  constructor() {}

  ngOnInit(): void {
    console.log('Parent', this.messageList);
  }

  addMessage(newMessage: string) {
    this.messageList.push(new Message(1, newMessage, new Date()));
  }
}
