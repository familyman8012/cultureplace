import { css } from "@emotion/react";
import Layout from "@src/components/layouts";
import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

function Index() {
  const router = useRouter();
  const { id, title } = router.query;

  console.log("title 도 넘어오나요?", title);

  const { status, data } = useQuery(["info", "detail", id], async () => {
    const getData = await axios.get(`/api/info/${id}?title=${title}`);
    return getData;
  });

  console.log(data);

  //@ts-ignore
  const item = data?.data[0].elements[0].elements[0];
  console.log(item, item && item.elements[1].elements[0].text);

  return (
    <Layout>
      <div
        css={css`
          width: 900px;
          margin: 50px auto 70px;
          .thumb {
            height: 398px;
            margin-right: 50px;
            img {
              height: 100%;
            }
          }
          .tit {
            font-size: 26px;
            font-weight: bold;
          }
          .date {
            margin-top: 10px;
          }
          dl {
            display: flex;
            margin-top: 7px;
            dt {
              width: 9rem;
            }
          }
        `}
      >
        {item && (
          <>
            <div
              css={css`
                display: flex;
              `}
            >
              <div className="thumb">
                <img src={item.elements[11].elements[0].text} alt="" />
              </div>
              <div className="area_info">
                <div className="wrap_tit">
                  <h2 className="tit">{item.elements[1].elements[0].text}</h2>
                  <div className="date">
                    {item.elements[2].elements[0].text} ~{" "}
                    {item.elements[3].elements[0].text}
                  </div>
                </div>
                <dl>
                  <dt>장소</dt>
                  <dd>{item.elements[4].elements[0].text}</dd>
                </dl>
                {item.elements[6].elements && (
                  <dl>
                    <dt>출연진</dt>
                    <dd>{item.elements[6].elements[0].text}</dd>
                  </dl>
                )}
                {item.elements[7].elements && (
                  <dl>
                    <dt>공연시간</dt>
                    <dd>{item.elements[7].elements[0].text}</dd>
                  </dl>
                )}
                <dl>
                  <dt>관람연령</dt>
                  <dd>{item.elements[8].elements[0].text}</dd>
                </dl>
                {item.elements[9].elements && (
                  <dl>
                    <dt>제작사</dt>
                    <dd>{item.elements[9].elements[0].text}</dd>
                  </dl>
                )}
                <dl>
                  <dt>가격</dt>
                  <dd>{item.elements[10].elements[0].text}</dd>
                </dl>
              </div>
            </div>
            <div
              css={css`
                margin-top: 70px;
                padding-top: 40px;
                border-top: 1px solid #eaeaea;
                h2 {
                  font-size: 20px;
                  margin-bottom: 10px;
                }
                .time {
                  margin-bottom: 30px;
                }
              `}
            >
              <div
                css={css`
                  width: 700px;
                  margin: 0 auto;
                `}
              >
                {item.elements.length >= 19 && item.elements[18].elements && (
                  <>
                    <h2>공연시간정보</h2>
                    <div className="time">
                      {item.elements[18].elements[0].text}
                    </div>
                  </>
                )}

                <div>
                  {item.elements[16].elements &&
                    item.elements[16].elements[0].elements && (
                      <img
                        src={item.elements[16].elements[0].elements[0].text}
                        alt=""
                      />
                    )}
                </div>
              </div>
            </div>
          </>
        )}
        <div
          css={css`
            margin-top: 70px;
            padding-top: 40px;
            border-top: 1px solid #eaeaea;
            font-family: MalgunGothic;
            h2 {
              font-size: 20px;
            }
            li {
              &:hover .title {
                color: #4db2ec;
              }
              .title {
                max-height: 2.4rem;
                -webkit-line-clamp: 1;
                margin-top: 3px;
                font-size: 1.6rem;
                line-height: 2.4rem;
                letter-spacing: -0.25px;
                font-weight: normal;
                font-family: MalgunGothic;
                font-weight: bold;
              }
            }
          `}
        >
          <h2
            css={css`
              display: inline-block;
              background: #000;
              color: #fff;
              padding-bottom: 0;
              font-size: 18px;
              padding: 0 10px;
            `}
          >
            Naver Blog Find
          </h2>
          <ul
            css={css`
              border-top: 1px solid #cdcdcd;
            `}
          >
            {data?.data[1].items.map((el, i) => (
              <li
                key={i}
                css={css`
                  border-bottom: 1px dashed #e7e7e7;
                  padding: 10px 0 20px;
                `}
              >
                <a href={el.link} target="_blank" rel="noreferrer">
                  <h3 className="title">
                    {el.title
                      .replace(
                        /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
                        ""
                      )
                      .replace(
                        "&lt(;)?(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?&gt(;)?",
                        ""
                      )}
                  </h3>
                  <div
                    className="blogInfo"
                    css={css`
                      margin: 10px 0 7px;
                      font-size: 13px;
                    `}
                  >
                    <span className="bloggername">😎 {el.bloggername}</span>
                    <span
                      className="postdate"
                      css={css`
                        margin-left: 15px;
                        color: #767676;
                      `}
                    >
                      📅 {dayjs(el.postdate).format("YYYY.MM.DD")}
                    </span>
                  </div>
                  <div
                    className="description"
                    css={css`
                      font-size: 15px;
                    `}
                  >
                    {el.description
                      .replace(
                        /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
                        ""
                      )
                      .replace(
                        "&lt(;)?(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?&gt(;)?",
                        ""
                      )}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default Index;
