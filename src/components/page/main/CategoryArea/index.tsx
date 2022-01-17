import Link from "next/link";
import { SwiperSlide } from "swiper/react";
import Slider from "@src/components/views/Slider";
import styled from "@emotion/styled";
import Card from "@src/components/elements/Card";
import Title from "@src/components/elements/Title";
import { IProduct } from "@src/typings/db";
import dayjs from "dayjs";
import React, { useCallback, useMemo, useState } from "react";
import CardBadge from "@src/components/elements/CardBadge";
import CardSkeleton from "@src/components/elements/Card/CardSkeleton";
import { css } from "@emotion/react";

export interface IGenreData {
  genreData?: IProduct[][] | undefined;
  isLoading?: boolean;
}

const WrapCategoryArea = styled.div`
  position: relative;
  .swiper {
    padding: 0 10px;
  }
`;

function Index({ genreData, isLoading }: IGenreData) {
  const genreTitle = [
    { title: "힐링산책", url: "/view/healing" },
    { title: "뮤지컬, 연극의 세계", url: "/view/theater" },
    { title: "내가 만든 작품이 전시되는 날", url: "/view/art" },

    {
      title: "#최고의 사운드, 인생음악, #작곡, #작사, #댄스",
      url: "/view/music"
    },
    { title: "맛, 다이닝, 요리, 와인, 쿡방", url: "/view/food" },
    {
      title: "사진, 영상, 영화의 세계",
      url: "/view/movie"
    },
    { title: "힙스타의 기본, 패션", url: "/view/fashion" },
    { title: "지헤를 얻기 위한 지식컬쳐", url: "/view/wisdom" }
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
            {isLoading && (
              <div
                css={css`
                  display: flex;
                `}
              >
                {Array.from({ length: 4 }).map((_, idx) => (
                  <CardSkeleton key={idx} />
                ))}
                ;
              </div>
            )}
            {!isLoading && (
              <Slider breakPoint={sliderOption} i={i}>
                {genreData &&
                  genreData[i]?.map((el: IProduct) => (
                    <SwiperSlide key={el._id}>
                      <Link href={`/detailview/${el._id}`}>
                        <a>
                          <CardBadge el={el} />
                          <Card data={el} querykey="main" />
                        </a>
                      </Link>
                    </SwiperSlide>
                  ))}
              </Slider>
            )}
          </WrapCategoryArea>
        );
      })}
    </>
  );
}

export default Index;
