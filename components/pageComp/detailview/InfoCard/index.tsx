import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import "dayjs/locale/ko";
import Button from "../../../elements/Button";
import router from "next/router";
import FavoriteButton from "./FavoriteButton";
import { InfoCard, MobileLinkArea, WrapInfoCard } from "./style";
import { IProduct } from "@src/typings/db";
import { css } from "@emotion/react";
import Link from "next/link";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { useProdDetail } from "@src/hooks/api/useProducts/useProductDetail";

dayjs.locale("ko");

interface InfoCard {
  data: IProduct;
  _id: string;
  session: Session | null;
}

function Index({ data, _id, session }: InfoCard) {
  const { data: buttonData, isFetched } = useProdDetail(String(_id));

  const {
    imgurl,
    title,
    location,
    meetday,
    people,
    firstmeet,
    comment,
    saleprice,
    price,
    joinMembr,
    isvod
  } = data;

  const router = useRouter();

  // 정가
  const priceNumber = useMemo(
    () => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    [price]
  );

  // 할인가
  const salePriceNumber = useMemo(
    () => saleprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    [saleprice]
  );

  // 할부
  const highPrice = useMemo(
    () => (saleprice / 5).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    [saleprice]
  );

  const firstMeetDay = dayjs(firstmeet);
  const startTime = useMemo(
    () => firstMeetDay.format(`MM/DD(${firstMeetDay.format("ddd")}) HH:mm`),
    [firstMeetDay]
  );

  let today = new Date();

  const linkPay = (_id: string) => {
    if (session === null) {
      alert("로그인 후 결제 가능합니다.");
      return;
    }
    router.push(`/payment/${_id}`);
  };

  return (
    <WrapInfoCard>
      {data && data?.genre !== "이벤트" ? (
        <InfoCard>
          <div className="imgarea">
            <MobileLinkArea>
              <button
                className="link_back"
                type="button"
                onClick={() => router.back()}
              >
                <span className="hiddenZoneV">뒤로 가기</span>
              </button>
              <Link href="/">
                <a className="link_home"></a>
              </Link>
            </MobileLinkArea>
            <img src={imgurl} width="100%" alt="" />
          </div>
          <div className="txtbox">
            <h2>{title}</h2>
            <div className="meetInfo">
              <div>
                <span>{location} |</span> <span>{meetday}</span>
              </div>
              <div>
                <span>시작일</span> <span>{startTime}</span>
              </div>
            </div>
            <div className="comment">#{people}</div>

            <div className="wrap_price">
              <span className={`price  ${saleprice !== 0 ? "issale" : ""}`}>
                {" "}
                <span className="txt">정가</span>
                {priceNumber}원
              </span>

              {saleprice !== 0 && (
                <>
                  {" "}
                  |
                  <span className="price">
                    <span className="txt">현재 판매가</span>
                    {salePriceNumber}원
                  </span>
                </>
              )}
            </div>
            {saleprice !== 0 && price > 10 && (
              <div className="wrap_price wrap_price2">
                <span className="price">
                  <span className="txt">5개월 무이자 할부 시 </span>월{" "}
                  {highPrice}원
                </span>
              </div>
            )}
          </div>

          <div className="box_btn">
            <FavoriteButton _id={_id} data={data} />
            {isvod &&
            isFetched &&
            buttonData?.joinMembr.some(el => el === session?.user.uid) ? (
              <Button
                color="brand2"
                size="l"
                onClick={() => router.push(`/vod/${_id}`)}
              >
                VOD 강의실로 이동
              </Button>
            ) : (
              <Button color="brand" size="l" onClick={() => linkPay(_id)}>
                나를 위한 경험, 지금 시작
              </Button>
            )}
          </div>
        </InfoCard>
      ) : (
        <InfoCard className="event">
          {data && (
            <>
              <h2>{title}</h2>
              <img src={imgurl} width="100%" alt="" />
              <div className="meetInfo">
                <div>
                  <span className="tit">일시:</span> <span>{startTime}</span>
                </div>
                <div>
                  <span className="tit">장소:</span> <span>{location}</span>
                </div>
              </div>
              <div className="price">멤버 {price}원</div>
              {dayjs(firstmeet) > dayjs(today) ? (
                <Button color="brand" size="s">
                  신청하기
                </Button>
              ) : (
                <Button color="event" size="s" outline>
                  이 이벤트는 종료 되었습니다.
                </Button>
              )}
            </>
          )}
        </InfoCard>
      )}
    </WrapInfoCard>
  );
}

export default Index;
