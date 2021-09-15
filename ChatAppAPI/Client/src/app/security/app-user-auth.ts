import { UserAuthBase } from '../shared/user-auth-base';

export class AppUserAuth extends UserAuthBase {
  canAccessChat: boolean = false;

  init(): void {
    super.init();

    this.canAccessChat = false;
  }
}
