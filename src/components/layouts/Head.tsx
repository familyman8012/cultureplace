import styled from "@emotion/styled";
import Link from "next/link";

const Header = styled.div`
  display: flex;
  padding: 2rem 0;
  h1 {
    color: ${({ theme }: any) => theme.color.brand};
  }
  ul {
    display: flex;
    margin: 0 auto;
    li {
      margin-right: 4rem;
      a {
        font-size: 14px;
        color: ${({ theme }: any) => theme.color.sub};
        &:hover {
          color: ${({ theme }: any) => theme.color.brand};
        }
      }
    }
  }
`;

function Head() {
  return (
    <Header>
      <h1>CULTURE PLACE</h1>
      <ul>
        <li>
          <Link href="/">
            <a>1Day Club</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>1Month Club</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>이벤트</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>웹진</a>
          </Link>
        </li>
      </ul>
    </Header>
  );
}

export default Head;
