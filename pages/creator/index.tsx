import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { useProducts } from "@src/hooks/api/useProducts";
import axios from "axios";
import { runInAction } from "mobx";
import { prodUpStore } from "@src/mobx/store";
import AdminLayout from "@components/layouts/Admin/layout";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { IProduct } from "@src/typings/db";
import router from "next/router";
import { useSession } from "next-auth/client";
import {
  AdminModal,
  GlowBtn,
  IndexTable,
  WrapIndexContent
} from "@components/pageComp/creator/styles";
import LessonUp from "@components/pageComp/creator/LessonUp";
import { css } from "@emotion/react";
import Curriculum from "@components/pageComp/creator/Curriculum";

dayjs.locale("ko");

export default function List() {
  const queryClient = useQueryClient();
  /* 테이블 data 구성 및 pagination */
  const [pageSize, setPageSize] = useState(20);
  const [curPage, setCurPage] = useState(1);
  const [showMemInfo, setshowMemInfo] = useState(0);

  //세션 정보 가져오기
  const [session] = useSession();

  //불러오기
  const { status, data, error } = useProducts(
    pageSize,
    curPage,
    undefined,
    "creator"
  );

  const handlePageChange = useCallback((page: number) => {
    setCurPage(page);
  }, []);

  useEffect(() => {
    session?.user.role === "user" && router.push("./creator/apply");
  }, [session?.user.role]);

  //islive  를 위한 hook
  const [showLiveModal, setShowLiveModal] = useState({
    show: false,
    productId: "",
    productName: "",
    islive: false
  });

  //상풍등록하러가기
  const writeProduct = useCallback(() => {
    runInAction(() => {
      prodUpStore.moveCreateProduct();
    });
  }, []);

  //상풍수정하러가기
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
      onSuccess: () =>
        queryClient.invalidateQueries(["list", "all", String(curPage)]),
      onError: (error, variables, context) => {
        // I will fire first
      }
    }
  );

  //레이어모달 - islive 보이기
  const handlerShowLiveModal = useCallback(
    (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, el: IProduct) => {
      e.stopPropagation();
      setShowLiveModal({
        show: true,
        productId: el._id,
        productName: el.title,
        islive: el.islive
      });
    },
    []
  );

  //레이어모달 - islive 닫기
  const handlerCloseLiveModal = useCallback(() => {
    setShowLiveModal({
      show: false,
      productId: "",
      productName: "",
      islive: false
    });
  }, []);

  //레이어모달 - islive 닫기
  const handlerChangeLiveModal = useCallback(() => {
    axios
      .patch(`/api/product/${showLiveModal.productId}`, {
        islive: !showLiveModal.islive
      })
      .then(res => {
        console.log(res);
        handlerCloseLiveModal();
      });
  }, [handlerCloseLiveModal, showLiveModal.islive, showLiveModal.productId]);

  // 레슨추가 modal
  const [vodManagement, setVodManagement] = useState({ _id: "", show: false });

  const handlerVodModal = (_id: string) => {
    setVodManagement({ _id, show: true });
  };

  const handlerCloseVodModal = () => {
    setVodManagement({ _id: "", show: false });
  };

  return (
    <>
      {(session?.user.role === "creator" ||
        session?.user.role === "master") && (
        <>
          {status === "loading" ? (
            <AdminLayout>Loading...</AdminLayout>
          ) : status === "error" ? (
            <AdminLayout>Error: {error?.message}</AdminLayout>
          ) : (
            <AdminLayout>
              <WrapIndexContent>
                <p>{session?.user.name} 님 반갑습니다.</p>
                <IndexTable showMemInfo={showMemInfo}>
                  <thead>
                    <tr>
                      <th scope="col">no.</th>
                      <th scope="col">대표이미지</th>
                      <th scope="col">제목</th>
                      {session?.user.role === "master" && (
                        <th scope="col">팀리더</th>
                      )}
                      <th scope="col">장소</th>
                      <th scope="col">시작일</th>
                      <th scope="col">status</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.products.map((el, i) => (
                      <tr key={el._id} onClick={() => modifyProduct(el._id)}>
                        <td>{i}</td>
                        <td>
                          <img src={el.imgurl} alt={el.title} />
                        </td>
                        <td className="title">{el.title}</td>
                        {session?.user.role === "master" && (
                          <td className="info_creator">
                            <span>{el.creator.name}</span>
                            <span>{el.creator.email}</span>
                            <span>{el.creator.phone}</span>
                          </td>
                        )}
                        <td>{el.location}</td>
                        <td>{dayjs(el.firstmeet).format(`YY.MM.DD (ddd)`)}</td>
                        <td className="live_status">
                          {session?.user.role === "master" ? (
                            <button onClick={e => handlerShowLiveModal(e, el)}>
                              {el.islive ? "live" : "unlive"}
                            </button>
                          ) : (
                            <span>{el.islive ? "등록" : "검토중"}</span>
                          )}
                        </td>
                        <td className="btn_wrap">
                          {el.isvod === true && (
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                handlerVodModal(el._id);
                              }}
                            >
                              VOD 관리
                            </button>
                          )}
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
                {showLiveModal.show && (
                  <AdminModal>
                    <span className="btn_close" onClick={handlerCloseLiveModal}>
                      x
                    </span>
                    <div className="cont">
                      {showLiveModal.productName} 을
                      {showLiveModal.islive ? "unlive" : "live"} 상태로
                      변경하시겠습니까?
                    </div>
                    <div className="box_btn">
                      <button onClick={handlerChangeLiveModal}>확인</button>
                      <button onClick={handlerCloseLiveModal}>취소</button>
                    </div>
                  </AdminModal>
                )}
                {vodManagement.show && (
                  <AdminModal
                    css={css`
                      width: 80%;
                    `}
                  >
                    <Curriculum
                      _id={vodManagement._id}
                      handlerCloseVodModal={handlerCloseVodModal}
                    />
                  </AdminModal>
                )}
                <Pagination
                  onChange={handlePageChange}
                  current={curPage}
                  showSizeChanger
                  pageSize={pageSize}
                  total={data?.productsCount}
                />
                <GlowBtn onClick={writeProduct}>상품등록</GlowBtn>
              </WrapIndexContent>
            </AdminLayout>
          )}
        </>
      )}
    </>
  );
}
