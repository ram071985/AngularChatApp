import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../models/message.model';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
  providers: [],
})
export class MessageBoxComponent implements OnInit {
  @Input() messageList: Message[] = [];
  @Output() messageSubmit = new EventEmitter<string>();


  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    })
  };

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
    this.onCreatePosts({
      userId: 1,
      text: value,
      dateCreated: new Date(),
    });
  }

  onCreatePosts(message: Message) {
    this.http.post<Message>(
      'https://localhost:5001/Messages',
      message,
      this.httpOptions
    ).subscribe((response) => {
      console.log(response);
    });
  }
  // clearValues() {
  //   this.messageInputText = '';
  // }
}
