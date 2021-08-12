import { NgForm } from '@angular/forms';
import { Message } from './models/message.model';

export class MessageService {
    messages: Message[] = [];

    addMessage(form: NgForm) {
        console.log(this.messages);
        const value = form.value;
        this.messages.push(new Message('reid', value.messageInputText, new Date()));
      }
}