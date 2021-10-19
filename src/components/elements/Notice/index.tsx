/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

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

function Notice() {
  return (
    <NoticeBox>
      <dt>트레바리 이용약관 개정 안내</dt>
      <dd className="desc">2021. 10. 01. 시행</dd>
      <dd className="writtenDate">2021.092.</dd>
    </NoticeBox>
  );
}

export default Notice;
