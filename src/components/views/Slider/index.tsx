/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  children: React.ReactNode;
  breakPoint?: {
    [key: number]: {
      slidesPerView: number;
      spaceBetween?: number;
    };
  };
  i?: number;
}

// install Swiper modules
SwiperCore.use([Navigation]);

const btnPrev = css`
  position: absolute;
  top: 50%;
  left: -50px;
  width: 3.7rem;
  height: 3.7rem;
  transform: translateY(-50%);
  background: url("/images/arrow_swiper.png") no-repeat left top;
  background-size: 3.7rem;
`;

const btnNext = css`
  left: auto;
  right: -50px;
  transform: rotate(180deg) translateY(50%);
`;

function Slider({ children, breakPoint, i }: Props) {
  return (
    <>
      {breakPoint ? (
        <>
          <Swiper
            navigation={{
              prevEl: `.swiper-btn-prev${i}`,
              nextEl: `.swiper-btn-next${i}`
            }}
            breakpoints={breakPoint}
            className="mySwiper"
          >
            {children}
          </Swiper>

          <div className={`swiper-btn-prev${i}`} css={btnPrev}>
            <span className="hiddenZoneV">prev</span>
          </div>
          <div className={`swiper-btn-next${i}`} css={[btnPrev, btnNext]}>
            <span className="hiddenZoneV">next</span>
          </div>
        </>
      ) : (
        <Swiper
          className="mySwiper"
          navigation={true}
          // pagination={{ clickable: true }}
          css={css`
            .swiper-button-prev,
            .swiper-button-next {
              width: 37px;
              height: 37px;
              &:after {
                display: none;
              }
            }
            .swiper-button-prev {
              background: url("/images/arrowWhite_swiper.png") no-repeat left
                top;
              background-size: 37px;
            }
            .swiper-button-next {
              transform: rotateX(180deg);
              background: url("/images/arrowWhite_swiper.png") no-repeat left
                top;
              background-size: 37px;
            }
          `}
        >
          <div className="swiper-wrapper">{children}</div>
        </Swiper>
      )}
    </>
  );
}

export default Slider;
