import React from "react";
import Title from "../Title";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import SectionWrap from "../SectionWrap";

const h3 = css`
  font-size: 19px;
  margin-bottom: 30px;
`;

const RefundTable = styled.table`
  width: 628px;
  margin-top: 10px;
  th {
    padding: 5px;
    background: #dadada;
    &:last-child td {
      border-bottom: none;
    }
  }
  td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #e2e6e9;
    &:hover {
      background: #ececec;
    }
  }
`;

function index() {
  return (
    <SectionWrap>
      <Title>환불안내</Title>
      <p>결제 당일 및 12월 03일 이전까지 전액 환불 가능</p>
      <RefundTable>
        <colgroup>
          <col width="50%" />
          <col width="50%" />
        </colgroup>
        <thead>
          <tr>
            <th>멤버십 해지 신청 시점</th>
            <th>환불 금액</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1차 모임 D-8 이전</td>
            <td>210,000원</td>
          </tr>
          <tr>
            <td>
              1차 모임 D-7
              <br />~ 2차 모임 D-8
            </td>
            <td>97,500원</td>
          </tr>
          <tr>
            <td>
              2차 모임 D-7
              <br />~ 3차 모임 D-8
            </td>
            <td>65,000원</td>
          </tr>
          <tr>
            <td>
              3차 모임 D-7
              <br />~ 4차 모임 D-8
            </td>
            <td>32,500원</td>
          </tr>
          <tr>
            <td>4차 모임 D-7 이후</td>
            <td>환불 불가</td>
          </tr>
        </tbody>
      </RefundTable>
    </SectionWrap>
  );
}

export default index;
