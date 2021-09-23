import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../../models/message.model';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from '../../shared/security/security.service';
import { AppUserAuth } from '../../security/app-user-auth';
import { MessageReturn } from 'src/app/models/message-return.model';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
  providers: [],
})
export class MessageBoxComponent implements OnInit {
  @ViewChild('f') messageForm: NgForm;
  securityObject: AppUserAuth | undefined;
  messageInputText = '';

  @Input() messageReturnList: MessageReturn[] = [];
  @Output() messageSubmit = new EventEmitter<string>();

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200',
    }),
  };

  constructor(
    private messageService: MessageService,
    private securityService: SecurityService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addMessage(form: NgForm) {
    const value = form.value.messageInputText;

    this.messageSubmit.emit(value);
    this.messageService.addMessage(form).subscribe((data: MessageReturn) => {
      console.log(data);
      this.messageReturnList.push({
        username: data.username,
        text: data.text,
        dateCreated: data.dateCreated,
      });
    });
    this.messageForm.reset();
  }

  logout(): void {
    this.securityService.logout();
    this.securityObject = this.securityService.securityObject;
    localStorage.removeItem('AuthObject');
    this.router.navigateByUrl('auth');
  }
  clearValues() {
    this.messageForm.reset();
  }
}
