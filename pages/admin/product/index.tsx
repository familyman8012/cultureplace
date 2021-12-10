import { useCallback, useMemo, useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { useProducts } from "@src/hooks/api/useProducts";
import axios from "axios";
import { runInAction } from "mobx";
import { prodUpStore } from "@src/mobx/store";
import AdminLayout from "@src/components/layouts/Admin/layout";
import { WrapIndexContent, IndexTable, GlowBtn } from "./styles";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

export default function list() {
  const queryClient = useQueryClient();

  //불러오기
  const { status, data, error } = useProducts();

  /* 테이블 data 구성 및 pagination */
  const [curPage, setCurPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const dataLength = useMemo(() => data?.length, [data]);
  const startPage = useMemo(
    () => curPage * pageSize - (pageSize - 1) - 1,
    [curPage]
  );
  const viewData = useMemo(() => curPage * pageSize, [curPage]);
  const handlePageChange = useCallback((page: number) => {
    setCurPage(page);
  }, []);

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
      onSuccess: () => queryClient.invalidateQueries("productData"),
      onError: (error, variables, context) => {
        // I will fire first
      }
    }
  );

  return (
    <AdminLayout>
      {status === "loading" ? (
        <span>Loading...</span>
      ) : status === "error" ? (
        <span>Error: {error?.message}</span>
      ) : (
        <WrapIndexContent>
          <IndexTable>
            <thead>
              <tr>
                <th scope="col">대표이미지</th>
                <th scope="col">모임명</th>
                <th scope="col">모임장소</th>
                <th scope="col">모임주기</th>
                <th scope="col">첫모임일</th>
                <th scope="col">삭제</th>
              </tr>
            </thead>
            <tbody>
              {data?.slice(startPage, viewData)?.map(el => (
                <tr key={el._id} onClick={() => modifyProduct(el._id)}>
                  <td>
                    <img src={el.imgurl} alt={el.title} />
                  </td>
                  <td>{el.title}</td>
                  <td>{el.location}</td>
                  <td>{el.meetday}</td>
                  <td>{dayjs(el.firstmeet).format(`YY.MM.DD (ddd)`)}</td>
                  <td className="col_wrap">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        deleteMutation.mutate(el._id);
                      }}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </IndexTable>
          <Pagination
            onChange={handlePageChange}
            current={curPage}
            pageSize={pageSize}
            total={dataLength}
          />
          <GlowBtn onClick={writeProduct}>상품등록</GlowBtn>
        </WrapIndexContent>
      )}
    </AdminLayout>
  );
}
