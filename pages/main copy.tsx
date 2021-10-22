/** @jsxImportSource @emotion/react */
import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Title from "../src/components/elements/Title";

import Layout from "../src/components/layouts";
import { fetchPosts } from "../src/hooks/api/usePosts";
import Product from "../pages/api/models/product";
import dbConnect from "./api/middleware/dbConnect";
import Slider from "../src/components/views/Slider";
import Card from "../src/components/elements/Card";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { SwiperSlide } from "swiper/react";
import { css } from "@emotion/react";

dayjs.locale("ko");

const Home = ({ products }: any) => {
  const { status, data, error } = useQuery("posts", () => fetchPosts(products));
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
    data.filter((el: any) => el.genre === "영화"),
    data.filter((el: any) => el.genre === "음악"),
    data.filter((el: any) => el.genre === "서울걷기"),
    data.filter((el: any) => el.genre === "소극장"),
    data.filter((el: any) => el.genre === "성장하기"),
  ];

  return (
    <Layout>
      <React.Fragment>
        {genreTitle.map((el, i) => {
          return (
            <>
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
                    <SwiperSlide>
                      <Card key={el.id} data={el} />
                    </SwiperSlide>
                  ))}
                </Slider>
              </div>
            </>
          );
        })}
      </React.Fragment>
    </Layout>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await dbConnect();
  const result = await Product.find({}, { createdAt: false, updatedAt: false });

  const products = result.map((doc) => {
    const product = doc.toObject();
    product._id = product._id.toString();
    product.firstmeet = product.firstmeet.toString();
    return product;
  });

  await queryClient.prefetchQuery("posts", () => fetchPosts(products));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      products,
    },
  };
}

export default Home;
