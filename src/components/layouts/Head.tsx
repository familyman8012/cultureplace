import styled from "@emotion/styled";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

const Header = styled.div`
  display: flex;
  padding: 2rem 0;
  h1 {
    color: ${({ theme }) => theme.color.brand};
  }
  ul {
    display: flex;
    margin: 0 auto;
    li {
      margin-right: 4rem;
      a {
        font-size: 14px;
        color: ${({ theme }) => theme.color.gray};
        &:hover {
          color: ${({ theme }) => theme.color.brand};
        }
      }
    }
  }
`;

const Login = styled.div`
  margin-left: auto;
  color: ${({ theme }) => theme.color.brand};
`;

function Head() {
  const [session, loading] = useSession();

  return (
    <Header>
      <h1>
        <Link href="/main">
          <a>CULTURE PLACE</a>
        </Link>
      </h1>
      <ul>
        <li>
          <Link href="/oneday">
            <a>1Day Club</a>
          </Link>
        </li>
        <li>
          <Link href="/month">
            <a>1Month Club</a>
          </Link>
        </li>
        <li>
          <Link href="/event">
            <a>이벤트</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>웹진</a>
          </Link>
        </li>
      </ul>
      <Login>
        {!session && <Link href="/signin">로그인</Link>}
        {session && (
          <>
            {session.user.email}
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )}
      </Login>
    </Header>
  );
}

export default Head;
