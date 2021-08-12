export class Message {
  public username: string;
  public message: string;
  public dateCreated: Date;

  constructor(username: string, message: string, dateCreated: Date) {
    this.username = username;
    this.message = message;
    this.dateCreated = dateCreated;
  }
}
