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
  _id: string;
  category: string;
  title: string;
  body: string;
  imgurl: string;
  summary: string;
}

export interface IMainVis {
  _id: string;
  pclocation: string;
  molocation: string;
  alt: string;
}

export interface ISSR {
  SsrData: {
    mainVisImgs: IMainVis[];
    products: IProduct[];
    blogData: INotice[];
    noticeData: INotice[];
  };
}
