import { css } from "@emotion/react";
import axios from "axios";
import { SetStateAction, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import SectionWrap from "../SectionWrap";
import { ReviewTitle } from "./style";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { useReview } from "@src/hooks/api/useReview";
import styled from "@emotion/styled";

function index({ id, session }: { id: string; session: any }) {
  console.log("id123", id);
  const [review, setReview] = useState({
    title: "",
    username: session.user.name,
    content: "",
    userid: session.user.uid,
    product: id
  });

  const onWriteReview = (target: any, e: { target: { value: any } }) => {
    setReview({ ...review, [target]: e.target.value });
  };

  const queryClient = useQueryClient();

  const { status, data: reviewData, error } = useReview(id);

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

  const delReviewMutation = useMutation(
    _id => axios.delete(`/api/review/${_id}`).then(res => console.log(res)),
    {
      onSuccess: () => queryClient.invalidateQueries("reviewData"),
      onError: (error, variables, context) => {
        // I will fire first
        console.log(error, variables);
      }
    }
  );

  // const onSubmit = useCallback((data: any) => {
  //   const variables = {
  //     username: session?.user.name,
  //     ...data
  //   };
  //   const saveReviewMutation = useMutation(
  //     () => axios.post(`/api/review/${id}`, variables),
  //     {
  //       onSuccess: () => queryClient.invalidateQueries("detailViewData"),
  //       onError: (error, variables, context) => {
  //         // I will fire first
  //         console.log(error, variables);
  //       }
  //     }
  //   );
  //   saveReviewMutation.mutate();
  //   // axios.post(`/api/review/${_id}`, variables).then(res => console.log(res));
  // }, []);

  // const handlerReview = () => {
  // axios
  //   .post("/api/review/616eee55ac3c88a81875224e", { title, content })
  //   .then(res => console.log(res));
  // };

  const ReviewItem = styled.div<{ active?: boolean }>`
    display: flex;
    margin-top: 20px;
    height: ${({ active }) => (active ? "auto" : "125px")};
  `;

  const ReviewList = styled.ul`
    li {
      padding: 20px 0;
      border-bottom: 2px solid #eee;
      &:first-child {
        padding-top: 0;
      }
    }
    .title {
      margin-bottom: 8px;
      font-size: 16px;
      font-weight: bold;
      line-height: 1.56;
      letter-spacing: -0.4px;
      color: rgb(42, 42, 44);
    }
    .content {
      font-size: 15px;
      line-height: 1.47;
      letter-spacing: -0.37px;
      color: rgba(42, 42, 44, 0.9);
    }
    .username {
      margin-top: 10px;
      font-size: 13px;
      line-height: 1.23;
      color: rgba(0, 0, 0, 0.5);
    }
  `;

  return (
    <SectionWrap>
      <ReviewTitle>멤버들은 이렇게 느꼈어요.</ReviewTitle>
      <ReviewList>
        {reviewData?.map((el: any, i: string) => {
          const { title, content, username } = el;
          return (
            <li key={el._id}>
              <div className="title">{title}</div>
              <div className="content">{content}</div>
              <div className="username">{username}</div>
              {/* <span onClick={() => delReviewMutation.mutate(el._id)}>삭제</span> */}
            </li>
          );
        })}
      </ReviewList>
      <div
        css={css`
          position: fixed;
          top: 0;
          right: 10px;
          width: 500px;
          height: 300px;
          border: 1px solid;
          textarea {
            height: 150px;
          }
        `}
      >
        {session !== undefined && (
          <>
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
            <span onClick={() => saveReviewMutation.mutate()}>버튼</span>
          </>
        )}
      </div>
    </SectionWrap>
  );
}

export default index;
