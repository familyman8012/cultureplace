/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

interface INotice {
  title: string;
  desc: string;
}

const NoticeBox = styled.dl`
  width: 50rem;
  border-bottom: 1px solid #ecece9;
  background: url("/images/arrow_notice.png") no-repeat right center;
  dt {
    font-size: 16px;
    margin-bottom: 1rem;
  }
  .desc {
    margin-bottom: 2rem;
    line-height: 14px;
  }
  .writtenDate {
    font-size: 12px;
    color: #838380;
  }
`;

function MainNotice({ title, desc }: INotice) {
  return (
    <NoticeBox>
      <dt>{title}</dt>
      <dd className="desc">{desc}</dd>
      <dd className="writtenDate">2021.09.23</dd>
    </NoticeBox>
  );
}

export default MainNotice;
