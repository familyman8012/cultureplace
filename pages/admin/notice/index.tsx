import React, { useEffect, useState } from "react";
import { INotice } from "@/../src/typings/db";
import { Table, Image, Button } from "antd";
import AdminLayout from "@/../src/components/layouts/Admin/layout";
import router from "next/router";
import axios from "axios";
import Link from "next/link";
import { runInAction } from "mobx";
import { QuillStore, noticeStore } from "@/../src/mobx/store";
import { useNotices, fetchNotices } from "@/../src/hooks/api/useNotices";
import { useMutation, useQueryClient } from "react-query";

export default function list() {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = useNotices();

  const writeNotice = () => {
    noticeStore.moveCreateNotice();
  };

  const modifyNotice = (_id: string) => {
    runInAction(() => {
      noticeStore.moveModifyNotice(_id);
    });
  };

  //상풍삭제
  const deleteMutation = useMutation(
    (_id: string) =>
      axios.delete(`/api/notice/${_id}`).then((res) => {
        return res.data;
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("noticeData"),
      onError: (error, variables, context) => {
        // I will fire first
        console.log(error, variables);
      },
    }
  );

  const columns = [
    {
      key: "1",
      title: "글제목",
      dataIndex: "title",
      // render: (imgurl: string) => (
      //   <Image
      //     width={127.5}
      //     height={85}
      //     src={imgurl}
      //     alt="모임대표이미지 등록"
      //   />
      // ),
    },
    {
      key: "2",
      title: "보기/삭제",
      dataIndex: "_id",
      render: (_id: string) => (
        <>
          <Button onClick={() => modifyNotice(_id)}>수정</Button>
          <Button onClick={() => deleteMutation.mutate(_id)}>삭제</Button>
        </>
      ),
    },
  ];

  return (
    <AdminLayout>
      {status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error?.message}</span>
      ) : (
        <div style={{ width: "80rem", margin: "0 auto" }}>
          {data && <Table columns={columns} dataSource={data} rowKey="_id" />}

          <span onClick={writeNotice}>상품등록</span>
        </div>
      )}
    </AdminLayout>
  );
}
