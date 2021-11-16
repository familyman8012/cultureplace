import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { debounce } from "lodash";
import Slider from "@src/components/views/Slider";
import { IMainVis } from "@src/typings/db";

export interface IMainVisImgs {
  mainVisImgs: IMainVis[];
}

function index({ mainVisImgs }: IMainVisImgs) {
  const [windowWidthSize, setWindowWidthSize] = useState<number>(1000);

  const handleResize = debounce(() => {
    setWindowWidthSize(window.innerWidth);
  }, 25);

  useEffect(() => {
    setWindowWidthSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Slider>
      {mainVisImgs?.map(el => (
        <SwiperSlide key={el._id}>
          <img
            src={windowWidthSize > 560 ? el.pclocation : el.molocation}
            alt={el.alt}
          />
        </SwiperSlide>
      ))}
    </Slider>
  );
}

export default index;
