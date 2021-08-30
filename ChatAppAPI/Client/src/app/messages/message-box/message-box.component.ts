import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() messageList: Message[] = [];
  @Output() messageSubmit = new EventEmitter<string>();
  
 
  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    console.log("Child-messages", this.messageList);
  //  this.messages = this.messageService.messages;
    // this.clearValues();
  }
  addMessage(form: NgForm) {
    const value = form.value.messageInputText;
    console.log()
    this.messageSubmit.emit(value);
    this.onCreatePosts({ UserId: 1, Text: "Hey"})
   }

   onCreatePosts(postData: { UserId: number; Text: string }) {
    console.log(postData);
   }
  // clearValues() {
  //   this.messageInputText = '';
  // }
}
