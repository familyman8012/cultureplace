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
  review: string[];
}

export interface INotice {
  _id: string;
  category?: string;
  title: string;
  body?: string;
  imgurl?: string;
  summary: string;
  updatedAt: string;
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

export interface Iinfinity {
  products: IProduct[];
  hasNextPage: boolean;
}

export interface IReview {
  _id: string;
  content: string;
  username: string;
  userid: string;
  product: IProduct;
  title: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface IReviewEdit {
  title: string;
  content: string;
  username: string;
  userid: string;
  product: string;
}

// export interface IReviewModal extends IReviewEdit {
//   state: string;
// }

// interface StringOnly {
//   [key: string]: string
// }

export interface IinfinityData {}
