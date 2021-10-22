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
import { debounce } from 'lodash';

dayjs.locale("ko");

const Home = ({ SsrData }: any) => {

  const [windowWidthSize, setWindowWidthSize] = useState<number>(1000);
  const handleResize = debounce(() => {
    setWindowWidthSize(window.innerWidth);
  }, 25);
  useEffect(() => {
    setWindowWidthSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { status, data, error } = useQuery("posts", () => fetchPosts(SsrData));

  const { mainVisImgs, products, notices } = data;

  const sliderOption = {
    749: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    750: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    751: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  };

  const genreTitle = [
    "역시 영화가 짱이지",
    "음악듣고 맥주마시고",
    "서울즐기기",
    "대학로, 추억, 칵테일, 마로니에 공원",
    "N잡러, 같이 가치 UP",
  ];

  const genreData = [
    products.filter((el: any) => el.genre === "영화"),
    products.filter((el: any) => el.genre === "음악"),
    products.filter((el: any) => el.genre === "서울걷기"),
    products.filter((el: any) => el.genre === "소극장"),
    products.filter((el: any) => el.genre === "성장하기"),
  ];

  const blogData = notices.filter((el:any) => el.category=== "블로그");

  return (
    <Layout>
      <React.Fragment>
        <Slider>
          {mainVisImgs?.map((el: any) => (
            <SwiperSlide key={el._id}>
              <img src={windowWidthSize > 560 ? el.pclocation : el.molocation} alt={el.alt} />
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
                      <Card data={el} />
                    </SwiperSlide>
                  ))}
                </Slider>
              </div>
            </React.Fragment>
          );
        })}
      <Title>블로그</Title>
      <div css={css`display:flex;justify-content:space-between;`}>
      {blogData?.map((el : any) => <Card type="blog" data={el} />)}
      </div>
      </React.Fragment>
    </Layout>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await dbConnect();
  const result = await Product.find({}, { createdAt: false, updatedAt: false });
  const result2 = await Mainvisimg.find(
    {},
    { showNum: false, createdAt: false, updatedAt: false }
  );

  const result3 = await Notice.find(
    {},
    { createdAt: false, updatedAt: false }
  );

  const mainVisImgs = result2.map((doc) => {
    const mainVisImg = doc.toObject();
    mainVisImg._id = mainVisImg._id.toString();
    return mainVisImg;
  });

  const products = result.map((doc) => {
    const product = doc.toObject();
    product._id = product._id.toString();
    product.firstmeet = product.firstmeet.toString();
    return product;
  });

  const notices = result3.map((doc) => {
    const notice = doc.toObject();
    notice._id = notice._id.toString();
    return notice;
  });

  const SsrData = {
    mainVisImgs,
    products,
    notices
  };

  await queryClient.prefetchQuery("posts", () => fetchPosts(SsrData));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      SsrData,
    },
  };
}

export default Home;
