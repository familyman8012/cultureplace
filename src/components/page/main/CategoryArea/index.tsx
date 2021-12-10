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
    { title: "음악듣고 맥주마시고", url: "view/music" },
    { title: "서울즐기기", url: "view/travel" },
    { title: "대학로, 추억, 칵테일, 마로니에 공원", url: "view/theater" },
    { title: "역시 영화가 짱이지", url: "view/movie" },
    { title: "N잡러, 같이 가치 UP", url: "view/njob" }
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
