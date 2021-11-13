import { useCallback } from "react";
import AdminLayout from "@src/components/layouts/Admin/layout";
import { Table, Image, Button } from "antd";
import axios from "axios";
import { runInAction } from "mobx";
import { prodUpStore } from "@src/mobx/store";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { IProduct } from "@src/typings/db";
import { css } from "@emotion/react";

export default function list() {
  const queryClient = useQueryClient();

  //불러오기
  const { status, data, error } = useQuery<IProduct[], Error>(
    "listData",
    async () => {
      const res = await axios.get("/api/product");
      return res.data;
    }
  );

  //상풍등록하러가기
  const writeProduct = useCallback(() => {
    runInAction(() => {
      prodUpStore.moveCreateProduct();
    });
  }, []);

  //상풍수정하러가기)
  const modifyProduct = (_id: string) => {
    runInAction(() => {
      prodUpStore.moveModifyProduct(_id);
    });
  };

  //상풍삭제
  const deleteMutation = useMutation(
    (_id: string) =>
      axios.delete(`/api/product/${_id}`).then(res => {
        return res.data;
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("listData"),
      onError: (error, variables, context) => {
        // I will fire first
        console.log(error, variables);
      }
    }
  );

  const columns = [
    {
      key: "1",
      title: "대표이미지",
      dataIndex: "imgurl",
      render: (imgurl: string) => (
        <Image
          width={127.5}
          height={85}
          src={imgurl}
          alt="모임대표이미지 등록"
        />
      )
    },
    {
      key: "2",
      title: "모임명",
      dataIndex: "title"
    },
    {
      key: "3",
      title: "모임장소",
      dataIndex: "location"
    },
    {
      key: "4",
      title: "모임주기",
      dataIndex: "meetday"
    },
    {
      key: "5",
      title: "첫모임일",
      dataIndex: "firstmeet"
    },
    {
      key: "6",
      title: "보기/삭제",
      dataIndex: "_id",
      render: (_id: string) => (
        <>
          <Button onClick={() => modifyProduct(_id)}>수정</Button>
          <Button onClick={() => deleteMutation.mutate(_id)}>삭제</Button>
        </>
      )
    }
  ];

  return (
    <AdminLayout>
      {status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error?.message}</span>
      ) : (
        <div
          css={css`
            width: 80%;
            margin: 0 auto;
          `}
        >
          <Table columns={columns} dataSource={data} rowKey="_id" />

          <span onClick={writeProduct}>상품등록</span>
        </div>
      )}
      );
    </AdminLayout>
  );
}
