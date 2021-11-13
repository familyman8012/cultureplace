import { WrapLayout } from "./styles";

type Props = {
  children: React.ReactNode;
};

function Adminlayout({ children }: Props) {
  return (
    <WrapLayout>
      <div className="left">
        <ul>
          <li>상품등록</li>
          <li>공지사항</li>
          <li>메인비쥬얼</li>
          <li>회원관리</li>
        </ul>
      </div>
      <div className="content">{children}</div>
    </WrapLayout>
  );
}

export default Adminlayout;
