import { signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { Header, Login, MenuArea, SearchForm } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faSortDown } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

export const CategoryLink = [
  { title: "영화", url: "/view/movie" },
  { title: "음식", url: "/view/food" },
  { title: "패션", url: "/view/fashion" },
  { title: "뮤직", url: "/view/music" },
  { title: "미술", url: "/view/art" },
  { title: "공연", url: "/view/theater" },
  { title: "번개", url: "/view/impromptu" },
  { title: "지식", url: "/view/wisdom" },
  { title: "힐링산책", url: "/view/healing" }
];

function Head() {
  const [session] = useSession();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const router = useRouter();
  const { genre } = router.query;

  useEffect(() => {
    setIsOpenMenu(false);
  }, [router.query]);

  const openCategory = useCallback(() => {
    setIsOpenMenu(prev => !prev);
  }, []);

  return (
    <>
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
          <aside>
            <ul>
              <li>
                <a>크리에이터 지원</a>
              </li>
              <li className="my">
                <a>내 모임</a>
              </li>
            </ul>
          </aside>
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
        <MenuArea>
          <li className={`categoryLink  ${isOpenMenu ? "on" : ""}`}>
            <button className="depth1" onClick={openCategory}>
              <span>전체 카테고리</span>
              <FontAwesomeIcon icon={faSortDown}></FontAwesomeIcon>
            </button>
            <ul className="categoryMenu">
              {CategoryLink.map((el, i) => (
                <li key={i}>
                  <Link href={el.url}>
                    <a>{el.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
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

          {/* <li>
            <Link href="/event">
              <a>이벤트</a>
            </Link>
          </li> */}

          <li>
            <Link href="/notice">
              <a>Story</a>
            </Link>
          </li>
          <li>
            <a
              href="http://yyagency7.iwinv.net/wp"
              target="_blank"
              rel="noreferrer"
            >
              Online Lesson
            </a>
          </li>
          <li>
            <Link href="/notice">
              <a>NTF 전시 &amp; 판매</a>
            </Link>
          </li>

          <li>
            <Link href="/notice">
              <a>블로그</a>
            </Link>
          </li>
          <li>
            <Link href="/notice">
              <a>인스타</a>
            </Link>
          </li>
          <li>
            <Link href="/notice">
              <a>유튜브</a>
            </Link>
          </li>
        </MenuArea>
      </Header>
    </>
  );
}

export default Head;
