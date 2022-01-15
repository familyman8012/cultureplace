import { signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { Header, Login, MenuArea, SearchForm } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faSortDown } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

export const CategoryLink = [
  { title: "힐링산책", url: "/view/healing" },
  { title: "공연", url: "/view/theater" },
  { title: "미술", url: "/view/art" },
  { title: "뮤직", url: "/view/music" },
  { title: "미식", url: "/view/food" },
  { title: "사진, 영상", url: "/view/movie" },
  { title: "패션", url: "/view/fashion" },
  { title: "지식", url: "/view/wisdom" }
];

function Head() {
  const [session] = useSession();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [searchKeyword, setsearchKeyword] = useState("");

  const router = useRouter();
  const { genre } = router.query;

  useEffect(() => {
    setIsOpenMenu(false);
  }, [router.query]);

  const openCategory = useCallback(() => {
    setIsOpenMenu(prev => !prev);
  }, []);

  const handlerSearchWrite = useCallback(e => {
    setsearchKeyword(e.target.value);
  }, []);
  const handleSearchMove = useCallback(
    e => {
      e.preventDefault();
      if (searchKeyword === "") return;
      router.replace(`/search?keyword=${searchKeyword}`);
    },
    [router, searchKeyword]
  );

  return (
    <>
      <Header>
        <div className="inner">
          <h1>
            <Link href="/">
              <a>CULTURE PLACE</a>
            </Link>
          </h1>
          <SearchForm onSubmit={handleSearchMove}>
            <label className="hiddenZoneV" htmlFor="search-input">
              함께 하고 싶은 모임명, 팀리더를 검색해보세요.
            </label>
            <input
              type="text"
              name="keyword"
              placeholder="모임명, 모임장소,  팀리더를 검색해보세요."
              maxLength={50}
              autoComplete="off"
              value={searchKeyword}
              onChange={e => handlerSearchWrite(e)}
            />
            <span className="btn-search" onClick={handleSearchMove}></span>
          </SearchForm>
          <aside>
            <ul>
              <li>
                <a>크리에이터 지원</a>
              </li>
              <li className="my">
                <Link href="/mypage">
                  <a>내 모임</a>
                </Link>
              </li>
            </ul>
          </aside>
          <Login>
            {!session && <Link href="/signin">로그인</Link>}
            {/* {session && (
              <>
                {session.user.email}
                <button onClick={() => signOut()}>Sign out</button>
              </>
            )} */}
            <div
              css={css`
                display: block;
                overflow: hidden;
                width: 36px;
                height: 36px;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
                background-image: url(//img.taling.me/Content/Images/placeholders/profile-default.thumb.jpg);
                background-position: center;
                background-size: cover;
              `}
            ></div>
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
            <Link href="/info">
              <a>Info</a>
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
          {/* <li>
            <Link href="/notice">
              <a>NTF 전시 &amp; 판매</a>
            </Link>
          </li> */}

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
