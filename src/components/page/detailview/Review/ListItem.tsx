import styled from "@emotion/styled";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

function ListItem({
  data,
  review,
  setReview,
  handlerViewMore,
  setmodalState
}: {
  data: any;
  review: any;
  setReview: any;
  handlerViewMore: any;
  setmodalState: any;
}) {
  const [show, setShow] = useState(false);

  const { _id, title, content, username } = data;

  const Item = styled.li`
    padding: 20px 0;
    border-bottom: 2px solid #eee;
    cursor: pointer;

    &:first-of-type {
      padding-top: 0;
    }
    &:nth-of-type(1),
    &:nth-of-type(2) {
      .title {
        margin-bottom: 8px;
      }
      .content {
        height: 45px;
      }
    }
    &.on {
      .title {
        margin-bottom: 8px;
      }
      .content {
        height: auto;
      }
    }

    .title {
      font-size: 16px;
      font-weight: bold;
      line-height: 1.56;
      letter-spacing: -0.4px;
      color: rgb(42, 42, 44);
    }
    .content {
      overflow: hidden;
      width: 95%;
      height: 0;
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
      background: url("/images/arrow_review.webp") no-repeat right 3px;
      background-size: 16px 10px;
    }
  `;
  const queryClient = useQueryClient();

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

  const modifyModal = (
    title: string,
    content: string,
    username: string,
    state: string
  ) => {
    handlerViewMore();
    setReview({ ...review, title, content, username });
    setmodalState(state);
  };

  return (
    <Item
      onClick={() => setShow(prev => !prev)}
      className={`list-item ${show ? "on" : ""}`}
    >
      <div className="title">{title}</div>
      <div className="content">
        {content?.split("\n").map((reviewtxt: any, i: any) => {
          return (
            <React.Fragment key={`line${i}`}>
              {reviewtxt}
              <br />
            </React.Fragment>
          );
        })}
      </div>
      <div className="username">
        {username}
        <span onClick={() => delReviewMutation.mutate(_id)}>삭제</span>
        <span onClick={() => modifyModal(title, content, username, "modify")}>
          수정
        </span>
      </div>
    </Item>
  );
}

export default ListItem;
