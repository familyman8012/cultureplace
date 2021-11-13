export interface IProduct {
  _id: string;
  title: string;
  desc: string;
  todo: string;
  people: string;
  peopleshow: boolean;
  imgurl: string;
  location: string;
  meetingcycle: string;
  meetday: string;
  firstmeet: Date;
  body: string;
  genre: string;
  comment: string[];
  price: number;
  quanity: number;
  islive: boolean;
  joinMembr: string[];
  favoriteduser: string[];
}

export interface INotice {
  title: String;
  body: String;
}
