import { Component } from '@angular/core';
import { MessageService } from './portal/messages/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent {
  title = 'ChatApp';
}
