export class Message {
  public userId: number;
  public username: string;
  public message: string;
  public dateCreated: Date;

  constructor(userId: number, username: string, message: string, dateCreated: Date) {
    this.userId = userId;
    this.username = username;
    this.message = message;
    this.dateCreated = dateCreated;
  }
}
