import dayjs from "dayjs";
import { useMemo } from "react";
import "dayjs/locale/ko";
import Button from "../../../elements/Button";
import { session } from "next-auth/client";
import router from "next/router";
import FavoriteButton from "./FavoriteButton";
import { InfoCard, WrapInfoCard } from "./style";
import { IProduct } from "@src/typings/db";

dayjs.locale("ko");

interface InfoCard {
  data: IProduct;
  _id: string;
}

function Index({ data, _id }: InfoCard) {
  const { imgurl, title, location, meetday, firstmeet, comment, price } = data;

  const firstMeetDay = dayjs(firstmeet);
  const startTime = useMemo(
    () => firstMeetDay.format(`MM/DD(${firstMeetDay.format("ddd")}) HH:mm`),
    [firstmeet]
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
          <img src={imgurl} width="100%" alt="" />
          <h2>{title}</h2>
          <div className="meetInfo">
            <div>
              <span>{location} |</span> <span>{meetday}</span>
            </div>
            <div>
              <span>첫 모임일</span> <span>{startTime}</span>
            </div>
          </div>
          <div className="comment">#{comment}</div>
          <div className="price">{price}원</div>
          <div className="box_btn">
            <FavoriteButton _id={_id} data={data} />
            <Button color="brand" size="l" onClick={() => linkPay(_id)}>
              달라지는 4개월, 지금 시작
            </Button>
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
