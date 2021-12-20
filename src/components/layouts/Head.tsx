import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { throttle } from "lodash";
import { Header, Login, SearchForm } from "./styles";

function Head() {
  const [session] = useSession();

  return (
    <Header>
      <div className="inner">
        <h1>
          <Link href="/">
            <a>CULTURE PLACE</a>
          </Link>
        </h1>
        <SearchForm>
          <span className="btn-search"></span>
          <label className="hiddenZoneV" htmlFor="search-input">
            함께 하고 싶은 모임명, 팀리더를 검색해보세요.
          </label>
          <input
            type="text"
            name="q"
            placeholder="함께 하고 싶은 모임명,  팀리더를 검색해보세요."
            maxLength={50}
            autoComplete="off"
          />
        </SearchForm>
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
      </div>
    </Header>
  );
}

export default Head;
