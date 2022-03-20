import { dehydrate, QueryClient, useQuery } from "react-query";
import { dbConnect, Product, Notice } from "../pages/api";
import { css } from "@emotion/react";
import { Stream } from "@cloudflare/stream-react";
import Layout from "@components/layouts";
import Morebtn from "@components/pageComp/indexpage/Morebtn";
import {
  MainVisual,
  WrapIndex,
  CategoryMenu,
  CardSlideArea,
  BlogArea,
  NoticeArea
} from "@components/pageComp/indexpage";
import { fetchProducts } from "@src/hooks/api/useProducts";
import { GetServerSideProps } from "next";
import { useState, useRef, useEffect } from "react";

const Home = ({ SsrData }: any) => {
  const [videoLoad, setVideoLoad] = useState({ Load: false, Loaded: false });
  const videoAreaRef: React.MutableRefObject<any> = useRef();
  const videoInput: React.MutableRefObject<any> = useRef();
  const [preview, setPreview] = useState(0);
  const { blogData, noticeData } = SsrData;
  const { data } = useQuery(["list", "main"], () => fetchProducts(90, 1));

  const vodPreviewList = [
    {
      genre: "인스타툰",
      people: "채재",
      title: "취미에서 수익으로 이어지는 나만의 인스타툰 드로잉",
      vodurl: "video/vod_preview1.mp4",
      imgurl: "images/vod_preview1.png"
    },
    {
      genre: "작사",
      people: "구태우",
      title: "방구석에서 전세계로 뻗어나가는 K-POP",
      vodurl: "video/vod_preview2.mp4",
      imgurl: "images/vod_preview2.png"
    },
    {
      genre: "작곡",
      people: "김태영",
      title: "IU, 양요섭 타이틀곡 프로듀서와 홈 스튜디오에서 작곡 입문하기",
      vodurl: "video/vod_preview3.mp4",
      imgurl: "images/vod_preview3.png"
    },
    {
      genre: "UX방법론",
      people: "박문지",
      title: "직군을 뛰어넘는 필수 UX방법론 톺아보기",
      vodurl: "video/vod_preview4.mp4",
      imgurl: "images/vod_preview4.png"
    }
  ];

  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  const productsData = data?.products;

  function getGenreData() {
    if (Array.isArray(productsData)) {
      return [
        productsData.filter(el => el.genre === "healing"),
        productsData.filter(el => el.genre === "theater"),
        productsData.filter(el => el.genre === "art"),
        productsData.filter(el => el.genre === "music"),
        productsData.filter(el => el.genre === "food"),
        productsData.filter(el => el.genre === "movie"),
        productsData.filter(el => el.genre === "fashion"),
        productsData.filter(el => el.genre === "wisdom")
      ];
    }
  }

  const genreData = getGenreData();

  return (
    <Layout>
      <div
        css={css`
          overflow: hidden;
          height: calc(100vh - 12.4rem);
          ${videoLoad.Loaded
            ? "height:auto !important"
            : `height:${videoAreaRef?.current?.offsetWidth * 0.563}px`}
        `}
      >
        <div
          className="stream_area"
          css={css`
            overflow: hidden;
            position: relative;
            width: calc(100vw - 13px);
            background: #fff;
            max-height: calc(100vh - 12.4rem);
            ${videoLoad.Loaded
              ? "height:auto !important"
              : `height:${videoAreaRef?.current?.offsetWidth * 0.563}px`}
          `}
          ref={videoAreaRef}
        >
          {/* {winReady && (
            <Stream
              src={vodPreviewList[preview].vodurl}
              responsive={true}
              streamRef={videoInput}
              autoplay={true}
              muted={true}
              loop={true}
              preload={true}
              poster="https://videodelivery.net/8dcedb1e9631d98d00c078e13d435f51/thumbnails/thumbnail.jpg?time=68s&amp;height=270"
              onLoadStart={() => setVideoLoad({ Load: true, Loaded: false })}
              onLoadedMetaData={() =>
                setVideoLoad({ Load: false, Loaded: true })
              }
            />
          )} */}
          <video
            className="video_swipe"
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => {
              setVideoLoad({ Load: false, Loaded: true });
            }}
            css={css`
              width: 100%;
              margin-top: -135px;
            `}
            ref={videoInput}
          >
            <source src={vodPreviewList[preview].vodurl} type="video/mp4" />
          </video>
          <div
            className="txt-box"
            css={css`
              position: absolute;
              left: 0;
              bottom: 0;
              width: 100%;
              height: 50px;
              padding: 50px 0 158px;
              background: linear-gradient(
                to top,
                rgba(0, 0, 0, 0.8),
                rgba(0, 0, 0, 0.46),
                rgba(0, 0, 0, 0)
              );
            `}
          >
            <div
              className="container"
              css={css`
                display: flex;
                max-width: 1040px;
                margin: 0 auto;
              `}
            >
              <h2
                css={css`
                  width: calc(100% - 600px);
                  margin-bottom: 20px;
                  font-size: 30px;
                  line-height: 42px;
                  letter-spacing: -0.75px;
                  color: #fff;
                  font-weight: 300;
                `}
              >
                {vodPreviewList[preview].title}
              </h2>
              <ul
                css={css`
                  display: flex;
                  width: 355px;
                  margin-left: auto;
                  justify-content: space-around;

                  li {
                    cursor: pointer;
                  }
                `}
              >
                {vodPreviewList.map((el, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setPreview(index);
                      videoInput.current.pause();
                      videoInput.current.load();
                    }}
                  >
                    <div
                      css={css`
                        display: inline-block;
                        width: 50px;
                        height: 50px;
                        opacity: 0.75;
                        overflow: hidden;
                        border-radius: 50%;

                        img {
                          width: 100%;
                          height: 100%;
                          object-fit: cover;
                          object-position: center;
                        }
                      `}
                    >
                      <img src={el.imgurl} alt={el.title} />
                    </div>
                    <div
                      className="txt"
                      css={css`
                        text-align: center;
                        p {
                          line-height: 17px;
                          color: rgba(255, 255, 255, 0.5);
                          word-break: break-all;
                        }
                        .subject {
                          font-size: 14px;
                          margin: 5px 0;
                        }
                        .tutor {
                          font-size: 12px;
                        }
                      `}
                    >
                      <p className="subject">{el.genre}</p>
                      <p className="tutor">{el.people}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <WrapIndex>
        <CardSlideArea genreData={genreData} />
      </WrapIndex>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await dbConnect();

  const [result, result2, result3] = await Promise.all([
    Notice.find(
      { category: "블로그" },
      { body: false, createdAt: false, updatedAt: false }
    )
      .limit(3)
      .lean(),
    Notice.find(
      { category: "공지사항" },
      { body: false, createdAt: false, updatedAt: false }
    )
      .limit(4)
      .lean(),
    Product.find({}, { body: false }).sort({ firstmeet: 1 }).limit(90).lean()
  ]);

  const SsrData = {
    blogData: JSON.parse(JSON.stringify(result)),
    noticeData: JSON.parse(JSON.stringify(result2)),
    products: JSON.parse(JSON.stringify(result3))
  };

  await queryClient.prefetchQuery(["list", "main"], () => SsrData);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      SsrData
    }
  };
};

export default Home;
