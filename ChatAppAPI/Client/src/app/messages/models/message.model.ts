export class Message {
  public userId: number;
  public text: string;
  public dateCreated: Date;

  constructor(userId: number, text: string, dateCreated: Date) {
    this.userId = userId;
    this.text = text;
    this.dateCreated = dateCreated;
  }
}
