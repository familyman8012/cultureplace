import { Footer } from "./styles";

function Foot() {
  return (
    <Footer>
      <div className="inner">
        <ul className="link_menu">
          <li>자주 묻는 질문</li>
          <li>문의하기</li>
          <li>블로그</li>
          <li>컬쳐플레이스 채용</li>
          <li>파트너 모집</li>
        </ul>
        <div className="compaynyInfo">
          <h1>컬쳐 플레이스</h1>
          <p>대표 윤은석 | 사업자번호 : 000</p>
          <p>
            서울특별시 종로구 율곡로10길 12, 2,3층 (와룡동, 창덕이십일) |
            1522-4616 | 통신판매업신고 2019-서울종로-0920
          </p>
        </div>
        <ul className="link_policy">
          <li>트레바리 운영정책</li>
          <li>개인정보처리방침</li>
          <li>이용약관</li>
          <li>공지사항</li>
        </ul>
      </div>
    </Footer>
  );
}

export default Foot;
