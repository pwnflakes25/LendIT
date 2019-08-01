export class UserModel {
  public userID: string;
  public userName: string;
  public name: string;
  public contact: string;
  public email: string;
  public address: string;
  public imagePath: string;

  constructor(userName: string, name: string, contact: string, email: string, address: string, imagePath: string, userID: string) {
    this.userName = userName;
    this.name = name;
    this.contact = contact;
    this.email = email;
    this.address= address;
    this.imagePath = imagePath;
    this.userID = userID;

  }
}
