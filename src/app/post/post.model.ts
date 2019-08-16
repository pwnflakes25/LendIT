
export class PostModel {

    public name: string;
    public price: number;
    public priceDuration: string;
    public description: string;
    public imagePath: string;
    public userID: string;
    public date: Date;
    public tags: string[];
    public categories: string[];

    constructor(name: string, price: number, pd: string, description: string, imagePath: string, days: number, tags: string[], date: Date, categories: string[]) {
      this.name = name;
      this.price = price;
      this.priceDuration = pd
      this.description = description;
      this.imagePath = imagePath;
      this.userID = null;
      this.date = new Date();
      this.tags = tags;
      this.categories = categories;

    }

}
