export class MessageReturn {
    public username: string;
    public text: string;
    public dateCreated: Date;
  
    constructor(username: string, text: string, dateCreated: Date) {
      this.username = username;
      this.text = text;
      this.dateCreated = dateCreated;
    }
  }