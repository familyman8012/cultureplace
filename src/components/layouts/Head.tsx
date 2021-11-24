import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { throttle } from "lodash";
import { Header, Login } from "./styles";

function Head() {
  const [session] = useSession();
  const [headPos, setHeadPos] = useState<string>("normal");
  const handlePos = throttle(() => {
    setHeadPos(document.documentElement.scrollTop > 64 ? "top" : "normal");
  }, 10);
  useEffect(() => {
    setHeadPos(document.documentElement.scrollTop > 64 ? "top" : "normal");
    window.addEventListener("scroll", handlePos);
    return () => {
      window.removeEventListener("scroll", handlePos);
    };
  }, []);

  return (
    <Header type={headPos === "top" ? "top" : "normal"}>
      <h1>
        <Link href="/">
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
