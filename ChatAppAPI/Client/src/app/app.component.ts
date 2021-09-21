import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from './messages/message.service';
import { AppUserAuth } from './security/app-user-auth';
import { SecurityService } from './shared/security/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ChatApp';
  securityObject: AppUserAuth | undefined;
  subscription: Subscription | undefined;
  canAccessChat: boolean = false;

  constructor(private securityService: SecurityService) {
    this.securityObject = securityService.securityObject;
  }

  ngOnInit(): void {
    this.subscription = this.securityService.securityReset.subscribe(() =>
      this.updateProperties()
    );
  }

  ngOnDestroy() {
    this.subscription!.unsubscribe();
  }

  private updateProperties() {
    this.canAccessChat = this.securityService.hasClaim('canAccessChat', 'true');
  }
}
