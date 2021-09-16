import { Component } from '@angular/core';
import { MessageService } from './messages/message.service';
import { AppUserAuth } from './security/app-user-auth';
import { SecurityService } from './shared/security/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent {
  title = 'ChatApp';
  securityObject: AppUserAuth | undefined;

  constructor(private securityService: SecurityService) {
    this.securityObject = securityService.securityObject;
  }

  logout(): void {
    this.securityService.logout();
    this.securityObject = this.securityService.securityObject;
    localStorage.removeItem('AuthObject');
  }
}
