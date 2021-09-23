export class Message {
  public userId: string;
  public username: string;
  public text: string;
  public createdDate: Date

  constructor(userId: string, username: string, text: string, createdDate: Date) {
    this.userId = userId;
    this.username = username;
    this.text = text;
    this.createdDate = createdDate;
  }
}
