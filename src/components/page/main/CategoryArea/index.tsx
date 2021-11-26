import Link from "next/link";
import { SwiperSlide } from "swiper/react";
import Slider from "@src/components/views/Slider";
import styled from "@emotion/styled";
import Card from "@src/components/elements/Card";
import Title from "@src/components/elements/Title";
import { IProduct } from "@src/typings/db";

export interface IGenreData {
  genreData: IProduct[][];
}

const WrapCategoryArea = styled.div`
  position: relative;
`;

function index({ genreData }: IGenreData) {
  const genreTitle = [
    "음악듣고 맥주마시고",
    "서울즐기기",
    "대학로, 추억, 칵테일, 마로니에 공원",
    "역시 영화가 짱이지",
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
        console.log(i);
        return (
          <WrapCategoryArea key={el}>
            <Title i={i}>{el}</Title>
            <Slider breakPoint={sliderOption} i={i}>
              {genreData &&
                genreData[i]?.map((el: any, i: number) => (
                  <SwiperSlide key={el._id}>
                    <Link href={`/detailview/${el._id}`}>
                      <a>
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

export default index;
