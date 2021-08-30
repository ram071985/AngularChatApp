import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../models/message.model';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
  providers: [],
})
export class MessageBoxComponent implements OnInit {
  @Input() messageList: Message[] = [];
  @Output() messageSubmit = new EventEmitter<string>();

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    console.log('Child-messages', this.messageList);
    //  this.messages = this.messageService.messages;
    // this.clearValues();
  }
  addMessage(form: NgForm) {
    const value = form.value.messageInputText;
    console.log();
    this.messageSubmit.emit(value);
    this.onCreatePosts({ UserId: 1, Text: value, DateCreated: new Date() });
  }

  onCreatePosts(postData: { UserId: number; Text: string; DateCreated: Date }) {
    console.log('Hey');
    this.http
      .post('https://localhost:5001/Messages', postData)
      .subscribe((response) => {
        console.log(response);
      });
  }
  // clearValues() {
  //   this.messageInputText = '';
  // }
}
