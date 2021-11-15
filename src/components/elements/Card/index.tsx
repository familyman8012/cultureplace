import React, { FC, useMemo } from "react";
import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useSession } from "next-auth/client";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import _ from "lodash";

dayjs.locale("ko");

interface ICard {
  _id: string;
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
  favoriteduser: [];
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
        position: relative;
        height: 17rem;
      }
      .txtbox {
        height: 17.6rem;
        padding: 1.2rem;
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
        padding: 1.2rem 0;
        dt {
          font-size: 1.6rem;
          font-weight: 500;
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
    img {
      height: 100%;
    }
  }
  .txtbox {
    position: relative;

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
        color: ${({ theme }: any) => theme.color.gray};
      }
    }
  }
  ${typeStyle}
`;

const FavoriteBtn = styled.div<{ on: boolean }>`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 37px;
  height: 37px;
  background: url(${({ on }) =>
      on ? "/images/main_favorite_on.png" : "/images/main_favorite.png"})
    no-repeat left top;
  background-size: 37px;

  &.on {
    background: url("/images/main_favorite_on.png") no-repeat left top;
  }
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

  console.log(data);
  const [session] = useSession();

  const favoriteChk = useMemo(
    //@ts-ignore
    () => data?.favoriteduser?.includes(String(session?.user.uid)),
    [data?.favoriteduser, session?.user.uid]
  );

  console.log("favoriteChk favoriteChk", favoriteChk);

  const variables = {
    _id: data?._id,
    favorite: favoriteChk,
    userid: session?.user?.uid
  };

  const queryClient = useQueryClient();

  console.log("data 느느느느는", data);

  const favoriteMutation = useMutation(
    () => axios.post("/api/favorite", variables),
    {
      onMutate: async () => {
        await queryClient.cancelQueries("posts");
        const previousDetail = queryClient.getQueryData<any>("posts");
        const updateProduct = previousDetail?.products.filter(
          (el: any) => el._id === data?._id
        );
        if (previousDetail) {
          if (!favoriteChk) {
            updateProduct[0].favoriteduser = [
              updateProduct[0].favoriteduser,
              session?.user.uid
            ];
            queryClient.setQueryData<any>("posts", {
              ...previousDetail,
              products: [...previousDetail.products, ...updateProduct]
            });
          } else {
            updateProduct[0].favoriteduser =
              updateProduct[0].favoriteduser.filter(
                (el: any) => el !== session?.user.uid
              );
            queryClient.setQueryData<any>("posts", {
              ...previousDetail,
              products: [...previousDetail.products, ...updateProduct]
            });
          }
        }
      },
      // onSuccess: () => queryClient.invalidateQueries("detailViewData"),
      onError: (error, variables, context) => {
        // I will fire first
        console.log(error, variables);
      }
    }
  );

  return (
    <CardWrap type={type} data={data} {...rest}>
      <div className="imgbox">
        <FavoriteBtn
          on={favoriteChk ? true : false}
          onClick={e => {
            e.stopPropagation();
            favoriteMutation.mutate();
          }}
        />
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
        {type === "blogMain" ||
          (type === "blog" && (
            <>
              <p>{data.summary}</p>
              <dd className="create_at">2021.09.23</dd>
            </>
          ))}
      </dl>
    </CardWrap>
  );
};

export default Card;
