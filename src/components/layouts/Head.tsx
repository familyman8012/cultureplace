import { signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { Header, Login, MenuArea, SearchForm } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faSortDown } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

export const CategoryLink = [
  { title: "힐링산책", url: "healing" },
  { title: "공연", url: "theater" },
  { title: "미술", url: "art" },
  { title: "뮤직", url: "music" },
  { title: "미식", url: "food" },
  { title: "사진, 영상", url: "movie" },
  { title: "패션", url: "fashion" },
  { title: "지식", url: "wisdom" }
];

const mypageLink = [
  { title: "내모임", url: "/mypage" },
  { title: "결제사항", url: "/mypage/payment" }
];

function Head() {
  const [session] = useSession();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [searchKeyword, setsearchKeyword] = useState("");
  const [showBulbble, setshowBulbble] = useState(false);

  const router = useRouter();
  const { genre } = router.query;

  console.log(session);

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

  const handleShowBubble = useCallback(() => {
    setshowBulbble(prev => !prev);
  }, []);

  const goMypage = useCallback(
    (url: string) => {
      router.push(url);
      setshowBulbble(false);
    },
    [router]
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
          <Login
            css={css`
              position: relative;
            `}
          >
            {!session ? (
              <Link href="/signin">로그인</Link>
            ) : (
              <div
                css={css`
                  display: block;
                  overflow: hidden;
                  width: 36px;
                  height: 36px;
                  -webkit-border-radius: 50%;
                  -moz-border-radius: 50%;
                  border-radius: 50%;
                  cursor: pointer;
                  background-image: url(//img.taling.me/Content/Images/placeholders/profile-default.thumb.jpg);
                  background-position: center;
                  background-size: cover;
                `}
                onClick={handleShowBubble}
              ></div>
            )}
            {showBulbble && (
              <div
                css={css`
                  z-index: 10;
                  background: #fff;
                  border: 1px solid #cc39d8;
                  color: #fff;
                  font-size: 14px;
                  padding: 0 1em;
                  position: relative;
                  text-align: center;
                  vertical-align: top;
                  width: max-content;
                  position: absolute;
                  top: 52px;
                  left: -22px;
                  border-radius: 5px;
                  &:after {
                    border: 0.5em solid transparent;
                    border-top-color: #cc39d8;
                    content: "";
                    margin-left: -0.5em;
                    position: absolute;
                    top: -15px;
                    left: 50%;
                    width: 0;
                    height: 0;
                    transform: rotate(180deg);
                  }
                  li {
                    padding: 5px 0;
                    color: #000;
                    font-weight: normal;
                    font-size: 14px;
                    cursor: pointer;
                  }
                `}
              >
                <ul>
                  {mypageLink.map((el, i) => (
                    <li onClick={() => goMypage(el.url)} key={i}>
                      {el.title}
                    </li>
                  ))}
                  <li onClick={() => signOut()}>로그아웃</li>
                </ul>
              </div>
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
                  <Link href={`/view/${el.url}`}>
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
