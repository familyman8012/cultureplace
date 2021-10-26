import { SetStateAction, useCallback, useState } from "react";
import { observer } from "mobx-react";
import QuillEditorView from "@/../src/components/views/QuillEditor/QuillEditorView";
import AdminLayout from "../../../src/components/layouts/Admin/layout";
import { useRouter } from "next/router";
import { noticeStore, QuillStore } from "@/../src/mobx/store";
import axios from "axios";
import { Table, Image, Button } from "antd";
import useImgUp from "@/../src/hooks/useImgUp";

function Detail() {
  const [imgData, setImgData, onImgUpHadler] = useImgUp("noticeoriginal");

  const onTitle = (e: { currentTarget: { value: string; }; }) => {
    QuillStore.titleData = e.currentTarget.value;
  };

  const onTextArea = (e: { currentTarget: { value: string; }; }) => {
    noticeStore.summary = e.currentTarget.value;
  }

  const onCategory = (e: any) => {
    noticeStore.selCategory = e.target.value;
  };

  // 이전 : 이전 내용을 바꾸고 싶다면
  const router = useRouter();
  const onPrev = useCallback(() => {
    router.back();
  }, []);

  const onModify = () => {
    axios
      .put(`/api/notice/${QuillStore.modifyId}`, {
        title: QuillStore.titleData,
        body: QuillStore.data,
        imgurl: imgData.replace(/\/noticeoriginal\//, "/notice/"),
        category: noticeStore.selCategory,
        summary : noticeStore.summary
      })
      .then(function (resp) {
        router.push("/admin/notice");
        noticeStore.reset();
      });
  };

  // 다음 : 상세정보 등록 : 확인하고 db로 저장하기
  const onSubmit = useCallback(() => {
    axios
      .post("/api/notice/", {
        title: QuillStore.titleData,
        body: QuillStore.data,
        imgurl: imgData.replace(/\/noticeoriginal\//, "/notice/"),
        category: noticeStore.selCategory,
        summary : noticeStore.summary
      })
      .then(function (resp) {
        router.push("/admin/notice");
        noticeStore.reset();
      });
    //router.push("./confirm");
  }, [QuillStore.data, QuillStore.titleData, imgData, noticeStore.selCategory, noticeStore.summary]);

  console.log("noticeStore?.category", noticeStore?.category);

  return (
    <AdminLayout>
      <input
        type="text"
        name="title"
        onChange={onTitle}
        defaultValue={QuillStore.titleData}
      />
      <textarea onChange={onTextArea} defaultValue={noticeStore.summary} />
      <div>
        <span>
          {imgData !== undefined ? (
            <Image
              width={255}
              height={170}
              src={imgData}
              alt="모임대표이미지 등록"
            />
          ) : noticeStore.imgurl !== null ? (
            <Image
              width={255}
              height={170}
              src={noticeStore.imgurl}
              alt="모임대표이미지 등록"
            />
          ) : null}
        </span>
        <input
          type="file"
          id="upload"
          className="image-upload"
          onChange={onImgUpHadler}
        />
      </div>
      <div>
        <select onChange={onCategory} defaultValue={noticeStore.selCategory}>
          {noticeStore?.categoryData.map((item: string) => (
            <option defaultValue={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <QuillEditorView category="상품등록" />
      <div>
        <button onClick={onPrev}>이전으로 가기</button>
        {QuillStore.state === "create" ? (
          <button onClick={onSubmit}>글등록</button>
        ) : (
          <button onClick={onModify}>글수정</button>
        )}
      </div>
    </AdminLayout>
  );
}

export default observer(Detail);
