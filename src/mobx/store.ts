import axios from "axios";
import router from "next/router";

const { observable } = require("mobx");

// const userStore = observable({
//   isLoggingIn: false,
//   data: null,
//   logIn(data: any) {
//     this.isLoggingIn = true;
//     setTimeout(() => {
//       this.data = data;
//       this.isLoggingIn = false;
//       postStore.data.push(1);
//     }, 2000);
//   },
//   logOut() {
//     this.data = null;
//   },
// });

// const postStore = observable({
//   data: [],
//   addPost(data: any) {
//     this.data.push(data);
//   },
// });

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
  },
});

const prodUpStore = observable({
  state: null,
  data: null,
  moveCreateProduct() {
    QuillStore.dir = "prodcont";
    prodUpStore.state = "create";
    prodUpStore.data = null;
    router.push("/admin/product/basicInfo");
  },
  moveModifyProduct(data: string) {
    QuillStore.dir = "prodcont";
    prodUpStore.state = "modify";
    prodUpStore.data = null;
    axios.get(`/api/product/${data}`).then((resp: any) => {
      this.data = resp.data[0];
      QuillStore.data = prodUpStore.data.body;
      router.push("/admin/product/basicInfo");
    });
  },
  addProduct(data: any) {
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
  },
});

const noticeStore = observable({
  imgurl: null,
  selCategory: "공지사항",
  categoryData: ["공지사항", "가이드", "멤버십 혜택", "사람들", "소식"],
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
      this.category = resp.data[0].category;
      router.push("/admin/notice/detail");
    });
  },
  reset() {
    QuillStore.reset();
    this.imgurl = null;
  },
});

export { prodUpStore, QuillStore, noticeStore };
