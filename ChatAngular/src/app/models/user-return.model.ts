export class UserReturn {
    public username: string;
    public active: boolean;

  
    constructor(username: string, active: boolean) {
      this.username = username;
      this.active = active;
    }
  }