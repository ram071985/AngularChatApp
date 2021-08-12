import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../models/message.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
  providers: []
})
export class MessageBoxComponent implements OnInit {
  messages: Message[] = [];
 
  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    console.log(this.messages);
    this.messages = this.messageService.messages;
    // this.clearValues();
  }

  // clearValues() {
  //   this.messageInputText = '';
  // }
}
