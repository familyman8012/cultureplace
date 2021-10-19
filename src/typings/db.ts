export interface IProduct {
  products: readonly any[] | undefined;
  title: String;
  imgurl: String;
  location: String;
  meetday: String;
  firstmeet: Date;
  body: String;
}

export interface INotice {
  title: String;
  body: String;
}
