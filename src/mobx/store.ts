import { INotice, IProduct } from "@src/typings/db";
import axios, { AxiosResponse } from "axios";
import router from "next/router";
import { ChangeEvent, MutableRefObject } from "react";

interface IQuill {
  title: string;
  body: string;
}

const { observable } = require("mobx");
const QuillStore = observable({
  state: null,
  modifyId: null,
  titleData: null,
  data: null,
  dir: null,
  writeContent(data: string) {
    this.data = data;
  },
  reset() {
    (this.titleData = null), (this.data = null), (this.state = null);
  },
  modifyContent(url: string) {
    axios.get(url).then((resp: { data: IQuill[] }) => {
      this.titleData = resp.data[0].title;
      this.data = resp.data[0].body;
    });
  }
});

const prodUpStore = observable({
  state: null,
  data: null,
  moveCreateProduct() {
    prodUpStore.reset();
    QuillStore.dir = "prodcont";
    prodUpStore.state = "create";
    router.push("/creator/basicInfo");
  },
  moveModifyProduct(_id: string) {
    prodUpStore.reset();
    QuillStore.dir = "prodcont";
    prodUpStore.state = "modify";
    axios.get(`/api/product/${_id}`).then((resp: AxiosResponse<IProduct[]>) => {
      this.data = resp.data[0];
      QuillStore.data = prodUpStore.data.body;
      router.push("/creator/basicInfo");
    });
  },
  addProduct(data: IProduct) {
    if (this.data === null) {
      this.data = data;
    } else {
      this.data = { ...this.data, ...data };
    }
  },
  reset() {
    QuillStore.reset();
    this.state = null;
    this.data = null;
  },
  get viewProduct() {
    return this.data.length;
  }
});

const noticeStore = observable({
  imgurl: null,
  selCategory: "공지사항",
  categoryData: [
    "공지사항",
    "블로그",
    "가이드",
    "멤버십 혜택",
    "사람들",
    "소식"
  ],
  summary: null,
  moveCreateNotice() {
    noticeStore.reset();
    QuillStore.state = "create";
    QuillStore.dir = "notice";
    router.push("/admin/notice/detail");
  },
  async moveModifyNotice(_id: string) {
    QuillStore.state = "modify";
    QuillStore.dir = "notice";
    QuillStore.modifyId = _id;
    await QuillStore.modifyContent(`/api/notice/${_id}`);
    await axios.get(`/api/notice/${_id}`).then((resp: { data: INotice[] }) => {
      this.imgurl = resp.data[0].imgurl;
      this.selCategory = resp.data[0].category;
      this.summary = resp.data[0].summary;
      router.push("/admin/notice/detail");
    });
  },
  reset() {
    QuillStore.reset();
    this.imgurl = null;
    this.selCategory = "공지사항";
    this.summary = null;
  }
});

const searchStore = observable({
  viewSelList: -1,
  searchInput: "",
  filterFind: new Array(),
  searchOption: {
    searchInput: undefined,
    filterFind: undefined
  },
  onInit(filterFindList: []) {
    this.filterFind = new Array();
    for (let i = 0; i < filterFindList.length; i++) {
      this.filterFind.push([]);
    }
  },
  onsearchInput(e: ChangeEvent<HTMLInputElement>) {
    this.searchInput = e.target.value;
  },
  onViewSel(i: number) {
    this.viewSelList = i;
    console.log(this.viewSelList);
  },
  onCheckboxChange(i: number, value: string) {
    if (this.filterFind[i].some((x: string) => x === value)) {
      let newArray = [...this.filterFind[i]].filter(el => el !== value);
      this.filterFind[i] = newArray;
    } else {
      let newArray = [...this.filterFind[i], value];
      this.filterFind[i] = newArray;
      console.log(this.filterFind);
    }
  },
  onApply(pageNum: number) {
    pageNum = 1;
    this.searchOption = {
      searchInput: this.searchInput,
      filterFind: this.filterFind
    };
  },
  onReset(pageNum: number) {
    this.searchInput = "";
    // this.filterFind = [[], [], []];
    console.log("리셋 데이터", this.searchInput);
    pageNum = 1;

    this.searchOption = {
      searchInput: undefined,
      filterFind: undefined
    };
  }
});

const infoStore = observable({
  item: null,
  showGenre: [],
  showTitle: "소개 : ",
  InfoData(i: number, title: string) {
    this.showGenre = [];
    this.showGenre = JSON.parse(this.item[i]).elements[0].elements;
    this.showTitle = title;
    console.log(this.showGenre);
  }
  // onApply(pageNum: number) {
  //   pageNum = 1;
  //   this.searchOption = {
  //     searchInput: this.searchInput,
  //     filterFind: this.filterFind
  //   };
  // }
});

export { prodUpStore, QuillStore, noticeStore, searchStore, infoStore };
