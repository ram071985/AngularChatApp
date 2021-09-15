import { UserAuthBase } from '../shared/security/user-auth-base';

export class AppUserAuth extends UserAuthBase {
  canAccessChat: boolean = false;

  init(): void {
    super.init();

    this.canAccessChat = false;
  }
}