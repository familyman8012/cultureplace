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
  .swiper {
    padding: 0 10px;
  }
`;

const CardBadgewWrapper = styled.div`
  position: relative;
  .card-badge {
    position: absolute;
    top: 6px;
    left: -6px;
    width: 46px;
    height: 46px;
    padding: 5px 0;
    z-index: 2;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    line-height: 1.25;
    letter-spacing: -0.12px;
    color: #ffffff;
    background-color: #f06182;
    &.online {
      background-color: #784deb;
    }
    .title,
    .card-badge__subtitle {
      font-size: 12px;
    }
    .card-badge__subtitle {
      font-weight: normal;
    }
  }
  .card-badge__tail {
    position: absolute;
    bottom: -6px;
    left: 0;
    border-style: solid;
    border-width: 0 6px 6px 0;
    border-color: transparent #a6435a transparent transparent;
    content: "";
  }
`;

function index({ genreData }: IGenreData) {
  const genreTitle = [
    {
      title: "영화를 힘께 즐기다, 영화를 만들다.",
      url: "view/music"
    },
    { title: "맛, 다이닝, 요리, 와인, 쿡방", url: "view/music" },
    { title: "힙스타의 기본, 패션", url: "view/theater" },
    {
      title: "#최고의 사운드, 인생음악, #작곡, #작사, #댄스",
      url: "view/movie"
    },
    { title: "내가 만든 작품이 전시되는 날", url: "view/njob" },
    { title: "뮤지컬, 연극의 세계", url: "view/travel" },
    { title: "지식컬쳐", url: "view/travel" }
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
                        {(el.saleprice !== 0 || el.location === "온라인") && (
                          <CardBadgewWrapper>
                            <div
                              className={`card-badge ${
                                el.location === "온라인" && "online"
                              }`}
                            >
                              <div className="card-badge__tail"></div>
                              {el.location === "온라인" && "online" ? (
                                <div className="title">온라인</div>
                              ) : (
                                <>
                                  <div className="title">SALE</div>
                                  <div className="card-badge__subtitle">
                                    ~{(el.price / el.saleprice) * 10}
                                  </div>
                                </>
                              )}
                            </div>
                          </CardBadgewWrapper>
                        )}
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
