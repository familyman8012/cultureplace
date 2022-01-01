import Link from "next/link";
import { SwiperSlide } from "swiper/react";
import Slider from "@src/components/views/Slider";
import styled from "@emotion/styled";
import Card from "@src/components/elements/Card";
import Title from "@src/components/elements/Title";
import { IProduct } from "@src/typings/db";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import CardBadge from "@src/components/elements/CardBadge";

export interface IGenreData {
  genreData: IProduct[][];
}

const WrapCategoryArea = styled.div`
  position: relative;
  .swiper {
    padding: 0 10px;
  }
`;

function Index({ genreData }: IGenreData) {
  const genreTitle = [
    {
      title: "영화를 힘께 즐기다, 영화를 만들다.",
      url: "/view/movie"
    },
    { title: "맛, 다이닝, 요리, 와인, 쿡방", url: "/view/food" },
    { title: "힙스타의 기본, 패션", url: "/view/fashion" },
    {
      title: "#최고의 사운드, 인생음악, #작곡, #작사, #댄스",
      url: "/view/music"
    },
    { title: "내가 만든 작품이 전시되는 날", url: "/view/art" },
    { title: "뮤지컬, 연극의 세계", url: "/view/theater" },
    { title: "번개", url: "/view/impromptu" },
    { title: "지헤를 얻기 위한 지식컬쳐", url: "/view/wisdom" },
    { title: "힐링산책", url: "/view/healing" }
  ];
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
      spaceBetween: 24
    }
  };

  const startDayCal = useCallback((val: Date) => {
    return dayjs(val).diff(dayjs(), "d");
  }, []);

  return (
    <>
      {genreTitle.map((el, i: number) => {
        return (
          <WrapCategoryArea key={el.title}>
            <Title i={i} url={el.url}>
              {el.title}
            </Title>
            <Slider breakPoint={sliderOption} i={i}>
              {genreData &&
                genreData[i]?.map((el: IProduct) => (
                  <SwiperSlide key={el._id}>
                    <Link href={`/detailview/${el._id}`}>
                      <a>
                        <CardBadge el={el} />
                        <Card data={el} querykey="posts" />
                      </a>
                    </Link>
                  </SwiperSlide>
                ))}
            </Slider>
          </WrapCategoryArea>
        );
      })}
    </>
  );
}

export default Index;
