export class Message {
  public userId: string;
  public text: string;
  public dateCreated: Date;

  constructor(userId: string, text: string, dateCreated: Date) {
    this.userId = userId;
    this.text = text;
    this.dateCreated = dateCreated;
  }
}
