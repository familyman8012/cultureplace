import React, { FC, useMemo } from "react";
import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

interface ICard {
  summary?: string;
  title: string;
  desc: string;
  todo: string;
  people: string;
  peopleshow: boolean;
  imgurl: string;
  location: string;
  meetday: string;
  firstmeet: string;
  body: string;
  genre: string;
  comment: string;
  price: number;
  quanity: number;
}

interface StyledComponentProps {
  type?: string;
  data: ICard;
  css?: SerializedStyles;
}

const typeStyle = ({ type }: StyledComponentProps) => {
  if (type === "basic") {
    return css`
      width: 25.7rem;
      border-radius: 0.8rem;
      .imgbox {
        height: 17rem;
      }
      .txtbox {
        height: 17.6rem;
        dt {
          font-size: 2rem;
        }
      }
    `;
  }
  if (type === "other") {
    return css`
      width: 34.35rem;
      border: none;
      border-radius: 0;
      .imgbox {
        height: 22.9rem;
      }
      .txtbox {
        dt {
          font-size: 1.6rem;
          color: #7b7b7b;
        }
        dd {
          &.desc {
            font-size: 1.5rem;
          }
          &.meetinfobox {
            position: static;
            font-size: 1.4rem;
          }
        }
      }
    `;
  }
  if (type === "event") {
    return css`
      width: 34.8rem;
      border-radius: 0;
      border: 1px solid #d8d8d8;
      .imgbox {
        height: 23.2rem;
      }
      .txtbox {
        position: relative;
        padding: 0;
        dt {
          height: 6rem;
          margin-bottom: 1rem;
          margin: 1.5rem 1.5rem 0;
          font-size: 2rem;
          border-bottom: 1px solid #d8d8d8;
        }
        dd {
          &.people {
            margin: 1rem;
          }
          &.meetinfobox {
            position: static;
            padding: 1rem 1.5rem;
            border-top: 1px solid #d8d8d8;
            background: #f7f7f7;
          }
        }
      }
    `;
  }
  if (type === "blog") {
    return css`
      width: 31%;
      border: none;
      .imgbox {
        overflow: hidden;

      border-radius: 10px;
      }
      .txtbox {
        dt {
          margin: 0.8rem 0;
          font-size: 1.9rem;
        }
        dd {
          &.desc {
            font-size: 1.6rem;
          }
          &.create_at {
            margin-top: 0.8rem;
            font-size: 1.4rem;
            color: #838380;
          }
        }
      }
    `;
  }
};

const CardWrap = styled("div")`
  overflow: hidden;
  width: 25.7rem;
  border: 1px solid #ecece9;
  dl,
  dt,
  dd {
    margin: 0;
    padding: 0;
  }

  .imgbox {
    overflow: hidden;
    width: 100%;
  }
  .txtbox {
    position: relative;
    padding: 1.2rem;

    dd {
      &.desc {
        font-size: 1.5rem;
      }
      &.meetinfobox {
        position: absolute;
        margin-bottom: 0;
        bottom: 1.2rem;
        font-size: 1.3rem;
      }
      &.todo {
        color: #1778b5;
        font-weight: 600;
        line-height: 1.8;
      }
      &.people {
        font-size: 14px;
      }
      span {
        display: block;
      }
    }
  }
  ${typeStyle}
`;

const Card: FC<StyledComponentProps> = ({ type = "basic", data, ...rest }) => {
  const firstMeetDay = dayjs(data.firstmeet);
  const startTime = useMemo(
    () => firstMeetDay.format(`MM/DD(${firstMeetDay.format("ddd")}) HH:mm`),
    [data.firstmeet]
  );
  const endTime = useMemo(
    () => dayjs(data.firstmeet).add(3, "hour").format("HH:mm"),
    [data.firstmeet]
  );

  return (
    <CardWrap type={type} data={data} {...rest}>
      <div className="imgbox">
        <img src={data.imgurl} alt="모임사진" />
      </div>
      <dl className="txtbox">
        <dt>{data.title}</dt>
        {type === "basic" && <dd className="desc">{data.desc}</dd>}
        {type === "other" && <dd className="todo">{data.todo}</dd>}
        {type === "event" && <dd className="people">{data.people}</dd>}
        {!(type === "blogMain" || type === "blog") && (
          <dd className="meetinfobox">
            <span className="location">{data.location}</span>
            <span className="firstmeet">
              | 첫 모임일 {startTime} ~ {endTime}
            </span>
          </dd>
        )}
        {type === "blogMain" || type === "blog" && (<><p>{data.summary}</p><dd className="create_at">2021.09.23</dd></>)}
      </dl>
    </CardWrap>
  );
};

export default Card;
