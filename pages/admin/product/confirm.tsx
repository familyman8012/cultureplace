/** @jsxImportSource @emotion/react */
import React, { useCallback, useMemo } from "react";
import { prodUpStore, QuillStore } from "@/../src/mobx/store";
import AdminLayout from "../../../src/components/layouts/Admin/layout";
import router from "next/router";
import { css } from "@emotion/react";
import { Image } from "antd";
import { confirmStyle } from "./styles";
import axios from "axios";

function Confirm() {
  if (prodUpStore.data !== null) {
    prodUpStore.data.body = QuillStore.data;
    prodUpStore.data.imgurl = prodUpStore.data.imgurl.replace(
      /\/cardoriginal\//,
      "/card/"
    );

    const modifyConfrimProduct = (_id: string) => {
      axios.put(`/api/product/${_id}`, prodUpStore?.data).then(function (resp) {
        prodUpStore.reset();
        router.push("/admin/product");
      });
    };

    const saveProduct = useCallback(() => {
      axios.post("/api/product/", prodUpStore?.data).then(function (resp) {
        prodUpStore.reset();
        router.push("/admin/product");
      });
    }, []);
    return (
      <AdminLayout>
        <>
          <div
            css={css`
              ${confirmStyle};
            `}
          >
            <h2>{prodUpStore?.data.category} 게시판에</h2>
            <div className="list">
              <h2>대표이미지</h2>
              <span>
                <Image
                  width={255}
                  height={170}
                  src={prodUpStore?.data.imgurl}
                  alt="모임대표이미지 등록"
                />
              </span>
              <dl>
                <dt>모임명</dt>
                <dd>{prodUpStore?.data.title}</dd>
                <dt>모임장소</dt>
                <dd>{prodUpStore?.data.location}</dd>
                <dt>모임주기</dt>
                <dd>{prodUpStore?.data.meetday}</dd>
                <dt>첫모임일</dt>
                <dd>{prodUpStore?.data.firstmeet}</dd>
                <dt>히고 싶은 말</dt>
                <dd>{prodUpStore?.data.comment}</dd>
              </dl>
              <h2>상세페이지</h2>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: prodUpStore?.data.body }}
              />
            </div>
            <p>를 등록하시겠습니까?</p>
            {prodUpStore.state === "create" ? (
              <button onClick={saveProduct}>등록</button>
            ) : (
              <button
                onClick={() => modifyConfrimProduct(prodUpStore?.data._id)}
              >
                수정
              </button>
            )}
            <button onClick={() => router.back()}>뒤로</button>
          </div>
        </>
        )
      </AdminLayout>
    );
  }
  return <div>상품을 다시 등록해주세요</div>;
}

export default Confirm;
