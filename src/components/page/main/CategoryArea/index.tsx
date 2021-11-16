import { css } from "@emotion/react";
import Card from "@src/components/elements/Card";
import Title from "@src/components/elements/Title";
import Slider from "@src/components/views/Slider";
import { IProduct } from "@src/typings/db";
import Link from "next/link";
import React from "react";
import { SwiperSlide } from "swiper/react";

export interface IGenreData {
  genreData: IProduct[][];
}

function index({ genreData }: IGenreData) {
  const genreTitle = [
    "역시 영화가 짱이지",
    "음악듣고 맥주마시고",
    "서울즐기기",
    "대학로, 추억, 칵테일, 마로니에 공원",
    "N잡러, 같이 가치 UP"
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
      spaceBetween: 30
    }
  };
  return (
    <>
      {genreTitle.map((el, i: number) => {
        return (
          <React.Fragment key={el}>
            <Title>{el}</Title>
            <div
              css={css`
                display: flex;
                position: relative;
                flex-wrap: wrap;
              `}
            >
              <Slider breakPoint={sliderOption} i={i}>
                {genreData &&
                  genreData[i]?.map((el: any, i: number) => (
                    <SwiperSlide key={el._id}>
                      <Link href={`/detailview/${el._id}`}>
                        <a>
                          <Card data={el} />
                        </a>
                      </Link>
                    </SwiperSlide>
                  ))}
              </Slider>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
}

export default index;
