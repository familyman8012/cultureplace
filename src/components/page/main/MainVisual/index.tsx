import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { debounce } from "lodash";
import Slider from "@src/components/views/Slider";
import { IMainVis } from "@src/typings/db";
import { Mainvis } from "./styles";

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

  const MainVisTxt = [
    {
      id: 1,
      txt: (
        <>
          <span>문화놀이터, 컬쳐플레이스 내려온다</span>
          <h2>
            문화를 즐긴다. 문화를 만든다.
            <br />
            컬쳐플레이스 개봉박두!
          </h2>
          <a>컬쳐플레이스?!</a>
        </>
      )
    },
    {
      id: 2,
      txt: (
        <>
          <span>테스트</span>
          <h2>
            테스트
            <br />
            테스트
          </h2>
          <a>테스트?!</a>
        </>
      )
    }
  ];

  return (
    <Mainvis>
      <Slider>
        {MainVisTxt?.map((el, i: number) => (
          <SwiperSlide key={el.id}>
            {({ isActive }) => (
              <div className={`inner ${isActive ? "on" : ""}`}>
                <div className="txtbox">{MainVisTxt[i].txt}</div>
                <div className="imgbox">
                  <img src="/images/mainvisimg_1.png" alt="" />
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Slider>
    </Mainvis>
  );
}

export default index;
