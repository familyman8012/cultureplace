/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Title from "../src/components/elements/Title";

import Layout from "../src/components/layouts";
import { fetchPosts } from "../src/hooks/api/usePosts";
import Product from "../pages/api/models/product";
import Mainvisimg from "../pages/api/models/mainvisimg";
import Notice from "../pages/api/models/notice";
import dbConnect from "./api/middleware/dbConnect";
import Slider from "../src/components/views/Slider";
import Card from "../src/components/elements/Card";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { SwiperSlide } from "swiper/react";
import { css } from "@emotion/react";
import { debounce } from "lodash";
import MainNotice from "../src/components/elements/MainNotice";
import Link from "next/link";

dayjs.locale("ko");

const Home = ({ SsrData }: any) => {
  const [windowWidthSize, setWindowWidthSize] = useState<number>(1000);
  const handleResize = debounce(() => {
    setWindowWidthSize(window.innerWidth);
  }, 25);
  useEffect(() => {
    setWindowWidthSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { status, data, error } = useQuery("posts", () => fetchPosts(SsrData));

  const { mainVisImgs, products, blogData, noticeData } = data;

  const sliderOption = {
    749: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    750: {
      slidesPerView: 2,
      spaceBetween: 20
    },

    751: {
      slidesPerView: 4,
      spaceBetween: 30
    }
  };

  const genreTitle = [
    "역시 영화가 짱이지",
    "음악듣고 맥주마시고",
    "서울즐기기",
    "대학로, 추억, 칵테일, 마로니에 공원",
    "N잡러, 같이 가치 UP"
  ];

  const genreData = [
    products.filter((el: any) => el.genre === "영화"),
    products.filter((el: any) => el.genre === "음악"),
    products.filter((el: any) => el.genre === "서울걷기"),
    products.filter((el: any) => el.genre === "소극장"),
    products.filter((el: any) => el.genre === "성장하기")
  ];

  return (
    <Layout>
      <React.Fragment>
        <Slider>
          {mainVisImgs?.map((el: any) => (
            <SwiperSlide key={el._id}>
              <img
                src={windowWidthSize > 560 ? el.pclocation : el.molocation}
                alt={el.alt}
              />
            </SwiperSlide>
          ))}
        </Slider>
        {genreTitle.map((el: any, i) => {
          return (
            <React.Fragment key={el._id}>
              <Title>{el}</Title>
              <div
                css={css`
                  display: flex;
                  position: relative;
                  flex-wrap: wrap;
                `}
              >
                <Slider breakPoint={sliderOption} i={i}>
                  {genreData[i]?.map((el: any, i: number) => (
                    <SwiperSlide key={el._id}>
                      <Link href={`/detailview/${el._id}`}>
                        <Card data={el} />
                      </Link>
                    </SwiperSlide>
                  ))}
                </Slider>
              </div>
            </React.Fragment>
          );
        })}
        <Title>블로그</Title>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          {blogData?.map((el: any) => (
            <Link href={`/notice/${el._id}`}>
              <Card type="blog" data={el} />
            </Link>
          ))}
        </div>
        <Title>트레바리 공지</Title>
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          `}
        >
          {noticeData.map((el: any) => {
            console.log("el", el);
            return (
              <Link href={`/notice/${el._id}`}>
                <a>
                  <MainNotice title={el.title} desc={el.summary} />
                </a>
              </Link>
            );
          })}
        </div>
      </React.Fragment>
    </Layout>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await dbConnect();

  const [result, result2, result3, result4] = await Promise.all([
    Mainvisimg.find({}, { showNum: false, createdAt: false, updatedAt: false }),
    Product.find({}, { createdAt: false, updatedAt: false }),
    Notice.find(
      { category: "블로그" },
      { createdAt: false, updatedAt: false }
    ).limit(3),
    Notice.find(
      { category: "공지사항" },
      { createdAt: false, updatedAt: false }
    ).limit(4)
  ]);

  function createSSrData(data: any) {
    const sData = data.map((doc: any) => {
      const newData = doc.toObject();
      for (var temp in newData) {
        if (typeof newData[temp] !== "string") {
          newData[temp] = newData[temp].toString();
        }
      }
      return newData;
    });
    return sData;
  }

  const SsrData = {
    mainVisImgs: createSSrData(result),
    products: createSSrData(result2),
    blogData: createSSrData(result3),
    noticeData: createSSrData(result4)
  };

  await queryClient.prefetchQuery("posts", () => fetchPosts(SsrData));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      SsrData
    }
  };
}

export default Home;
