import React from 'react'
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
    children: React.ReactNode;
    breakPoint: {
        749: {
            slidesPerView: number;
            spaceBetween: number;
        };
        750: {
            slidesPerView: number;
            spaceBetween: number;
        };
        751: {
            slidesPerView: number;
            spaceBetween: number;
        };
    },    
    i : number
  };

  // install Swiper modules
SwiperCore.use([Navigation]);

function Slider({children, breakPoint, i}: Props) {
    return (
        <>
        <Swiper
        navigation={{
            prevEl: `.swiper-btn-prev${i}`,
          nextEl: `.swiper-btn-next${i}`,
          
        }}
        breakpoints={breakPoint}
        className="mySwiper"
      >
        {children}
        </Swiper>
        <div className={`swiper-btn-prev${i}`}>prev</div>
        <div className={`swiper-btn-next${i}`}>next</div>
        </>
    )
}

export default Slider
