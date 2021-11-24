import React, { useCallback, useState } from "react";
import { css } from "@emotion/react";
import axios from "axios";
import SectionWrap from "../SectionWrap";
import { ReviewTitle } from "./style";
import { useMutation, useQueryClient } from "react-query";
import { useReview } from "@src/hooks/api/useReview";
import styled from "@emotion/styled";
import ListItem from "./ListItem";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import Button from "@src/components/elements/Button";
import ReviewModal from "@src/components/views/ReviewModal";

function index({ id, session }: { id: string; session: any }) {
  const [review, setReview] = useState({
    title: "",
    username: session.user.name,
    content: "",
    userid: session.user.uid,
    product: id
  });
  const [curPage, setCurPage] = useState(1);

  const [modalState, setmodalState] = useState("");

  const handlePageChange = useCallback((page: number) => {
    setCurPage(page);
  }, []);

  const {
    status,
    data: reviewData,
    error,
    isPreviousData
  } = useReview(id, curPage);

  const ReviewList = styled.div`
    .rc-pagination {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  `;

  const WriteBtn = css`
    display: flex;
    width: 100px;
    justify-content: center;
    align-items: center;
    margin-left: auto;
  `;
  const [modalOpen, setModalOpen] = useState(false);
  const handlerViewMore = useCallback(() => {
    setReview({ ...review, title: "", content: "", username: "" });
    setmodalState("save");
    setModalOpen(prev => !prev);
  }, []);

  return (
    <SectionWrap>
      {session !== undefined && (
        <>
          <ReviewTitle>멤버들은 이렇게 느꼈어요.</ReviewTitle>
          <ReviewList>
            <ul className="list">
              {reviewData?.reviews.map((el: any, i: string) => {
                return (
                  <ListItem
                    key={el._id}
                    data={el}
                    review={review}
                    setReview={setReview}
                    setmodalState={setmodalState}
                    handlerViewMore={handlerViewMore}
                  />
                );
              })}
            </ul>
            <Pagination
              onChange={handlePageChange}
              current={curPage}
              pageSize={5}
              total={reviewData?.count}
            />
            <Button
              color="brand"
              size="xs"
              outline
              css={WriteBtn}
              onClick={handlerViewMore}
            >
              리뷰등록
            </Button>
          </ReviewList>
          {modalOpen && (
            <ReviewModal
              handlerViewMore={handlerViewMore}
              review={review}
              setReview={setReview}
              session={session}
              id={id}
              modalState={modalState}
            />
          )}
        </>
      )}
    </SectionWrap>
  );
}

export default index;
