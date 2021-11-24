import { css } from "@emotion/react";
import Modal from "@src/components/elements/Modal";
import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

function index({
  handlerViewMore,
  session,
  id,
  review,
  setReview,
  modalState
}: any) {
  const onWriteReview = (target: any, e: { target: { value: any } }) => {
    setReview({ ...review, [target]: e.target.value });
  };

  const queryClient = useQueryClient();
  const saveReviewMutation = useMutation(
    () => axios.post(`/api/review/${id}`, review).then(res => console.log(res)),
    {
      onSuccess: () => queryClient.invalidateQueries("reviewData"),
      onError: (error, variables, context) => {
        // I will fire first
        console.log(error, variables);
      }
    }
  );
  return (
    <Modal title={`환불안내`} onClick={handlerViewMore}>
      <input
        type="text"
        id="title"
        placeholder="제목"
        value={review.title}
        onChange={e => onWriteReview("title", e)}
      />
      <input
        type="text"
        id="username"
        value={review.username}
        onChange={e => onWriteReview("username", e)}
        placeholder="이름"
      />
      <textarea
        id="content"
        css={css`
          border: 1px solid;
        `}
        value={review.content}
        onChange={e => onWriteReview("content", e)}
        placeholder="어떤 점이 좋으셨나요?"
      ></textarea>
      {modalState === "save" && (
        <span onClick={() => saveReviewMutation.mutate()}>글등록</span>
      )}
      {modalState === "modify" && (
        <span onClick={() => saveReviewMutation.mutate()}>수정</span>
      )}
    </Modal>
  );
}

export default index;
