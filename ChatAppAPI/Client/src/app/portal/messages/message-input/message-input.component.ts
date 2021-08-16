import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss'],
  providers: []
})
export class MessageInputComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }
  addMessage(form: NgForm) {
    this.messageService.addMessage(form)
   }
}
