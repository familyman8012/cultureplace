import Link from "next/link";
import { WrapLayout } from "./styles";

type Props = {
  children: React.ReactNode;
};

const AdminMenu = [
  { menuName: "상품등록", url: "/admin/product" },
  { menuName: "공지사항", url: "/admin/notice" },
  { menuName: "메인비쥬얼", url: "/admin/mainvis" }
];

function Adminlayout({ children }: Props) {
  return (
    <WrapLayout>
      <div className="left">
        <ul>
          {AdminMenu.map(el => (
            <li key={el.menuName}>
              <Link href={el.url}>
                <a>{el.menuName}</a>
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://admin.bootpay.co.kr/receipt"
              target="_blank"
              rel="noreferrer"
            >
              부트페이관리자
            </a>
          </li>
        </ul>
      </div>
      <div className="content">{children}</div>
    </WrapLayout>
  );
}

export default Adminlayout;
