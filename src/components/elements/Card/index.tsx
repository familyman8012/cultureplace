import { FC, useMemo } from "react";
import { CardWrap } from "./styles";
import FavoriteButton from "../FavoriteButton";
import { IProduct } from "@src/typings/db";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");
interface ICard {
  type?: string;
  data: IProduct;
}

function Card({ type = "basic", data, ...rest }: ICard) {
  const firstMeetDay = dayjs(data.firstmeet);
  const startTime = useMemo(
    () => firstMeetDay.format(`MM/DD(${firstMeetDay.format("ddd")}) HH:mm`),
    [data.firstmeet]
  );
  const endTime = useMemo(
    () => dayjs(data.firstmeet).add(3, "hour").format("HH:mm"),
    [data.firstmeet]
  );

  const { title, imgurl, desc, todo, people, location } = data;

  return (
    <CardWrap type={type} {...rest}>
      <div className="imgbox">
        <FavoriteButton data={data} />
        <img src={imgurl} alt="모임사진" />
      </div>
      <dl className="txtbox">
        <dt>{title}</dt>
        {type === "basic" && <dd className="desc">{desc}</dd>}
        {type === "other" && <dd className="todo">{todo}</dd>}
        {type === "event" && <dd className="people">{people}</dd>}
        <dd className="meetinfobox">
          <span className="location">{location}</span>
          <span className="firstmeet">
            | 첫 모임일 {startTime} ~ {endTime}
          </span>
        </dd>
      </dl>
    </CardWrap>
  );
}

export default Card;
