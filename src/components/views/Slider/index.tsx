import React from "react";
import { css } from "@emotion/react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper } from "swiper/react";
import { BtnNext, BtnPrev, OneSwiper } from "./styles";

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

          <BtnPrev className={`swiper-btn-prev${i}`}>
            <span className="hiddenZoneV">prev</span>
          </BtnPrev>
          <BtnNext className={`swiper-btn-next${i}`}>
            <span className="hiddenZoneV">next</span>
          </BtnNext>
        </>
      ) : (
        <Swiper
          className="mySwiper"
          navigation={true}
          css={css`
            ${OneSwiper}
          `}
        >
          <div className="swiper-wrapper">{children}</div>
        </Swiper>
      )}
    </>
  );
}

export default Slider;
