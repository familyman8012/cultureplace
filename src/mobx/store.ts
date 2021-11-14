import { IProduct } from "@src/typings/db";
import axios, { AxiosResponse } from "axios";
import router from "next/router";

const { observable } = require("mobx");
const QuillStore = observable({
  state: null,
  modifyId: null,
  titleData: null,
  data: null,
  dir: null,
  writeContent(data: any) {
    this.data = data;
  },
  reset() {
    (this.titleData = null), (this.data = null), (this.state = null);
  },
  modifyContent(url: string) {
    axios.get(url).then((resp: any) => {
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
    router.push("/admin/product/basicInfo");
  },
  moveModifyProduct(_id: string) {
    prodUpStore.reset();
    QuillStore.dir = "prodcont";
    prodUpStore.state = "modify";
    axios.get(`/api/product/${_id}`).then((resp: AxiosResponse<IProduct[]>) => {
      this.data = resp.data[0];
      QuillStore.data = prodUpStore.data.body;
      router.push("/admin/product/basicInfo");
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
    await axios.get(`/api/notice/${_id}`).then((resp: any) => {
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

export { prodUpStore, QuillStore, noticeStore };
