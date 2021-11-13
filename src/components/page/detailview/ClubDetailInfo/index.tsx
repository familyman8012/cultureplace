import React from "react";
import styled from "@emotion/styled";
import Title from "../Title";
import SectionWrap from "../SectionWrap";

const Table = styled.table`
  width: 690px;
  th,
  td {
    padding-bottom: 12px;
    vertical-align: top;
    ul {
      margin-left: 5rem;
    }
    li {
      list-style: disc;
    }
  }
  th {
    width: 80px;
    text-align: left;
  }
`;

function index() {
  return (
    <SectionWrap>
      <Title>클럽 상세 안내</Title>
      <Table>
        <tbody>
          <tr>
            <th scope="row">멤버십</th>
            <td>결제일부터 2022년 03월 09일까지</td>
          </tr>
          <tr>
            <th scope="row">모임장소</th>
            <td>
              안국 아지트 | 서울특별시 종로구 율곡로10길 12, 안국역/종로3가역
              도보 7분 거리
            </td>
          </tr>
          <tr>
            <th scope="row">모임일정</th>
            <td>
              매달 세 번째 수요일, 19시 40분 ~ 22시 40분
              <br />
              1회차 2021.11.17(수)
              <br />
              2회차 2021.12.15(수)
              <br />
              3회차 2022.1.19(수)
              <br />
              4회차 2022.2.16(수)
              <br />
            </td>
          </tr>
          <tr>
            <th scope="row">독후감</th>
            <td>
              매 모임 2일 전까지 클럽 모임 페이지에 제출 | 최소 글자수 400자
            </td>
          </tr>
          <tr>
            <th scope="row">공지사항</th>
            <td>
              <ul>
                <li>
                  [내 강점으로 배우는 나 활용법]클럽의 모임 인원은 10명입니다.
                </li>
                <li>
                  첫 모임 9일 전까지 모임 인원이 충족되지 않으면 모집 기간
                  연장을 위해 전체 일정을 1개월씩 연기할 수 있습니다.
                </li>
                <li>
                  오프라인에서 진행되는 클럽입니다. 사회적 거리두기 4단계에서는
                  시설 이용 시간 제한(22시까지)으로 모임 시간이 19시~22시로
                  조정될 수 있습니다.
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </Table>
    </SectionWrap>
  );
}

export default index;
