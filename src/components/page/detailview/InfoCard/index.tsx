import styled from "@emotion/styled";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import "dayjs/locale/ko";
import Button from "../../../elements/Button";
import { css } from "@emotion/react";
import { session, useSession } from "next-auth/client";
import router from "next/router";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

dayjs.locale("ko");

const WrapInfoCard = styled.div`
  position: fixed;
  top: 110px;
  width: 1240px;
`;

const InfoCard = styled.div`
  position: absolute;
  right: 0;
  width: 380px;
  box-shadow: 5px 10px 30px 0 rgb(93 97 112 / 21%);
  background-color: white;
  padding: 32px;
  border: none;
  h2 {
    margin: 20px 0 9px;
    color: #2a2a2c;
    font-size: 22px;
    font-weight: bold;
    line-height: 1.59;
  }

  .meetInfo {
    margin-bottom: 8px;
    div span {
      margin: 0 0 8px;
      color: #737373;
      font-size: 14px;
      font-weight: bold;
      line-height: 1.5;
    }
  }
  .comment {
    display: inline;
    padding: 1px 5px;
    font-size: 13px;
    background: rgb(229, 255, 57);
  }
  .price {
    margin-bottom: 20px;
    padding-top: 15px;
    color: #2a2a2c;
    text-align: right;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: -0.25px;
  }
  .box_btn {
    display: flex;
    button:last-child {
      margin-left: auto;
    }
  }
  &.event {
    left: 0;
    right: auto;
    box-shadow: none;
    h2 {
      margin: 0 0 40px;
      padding: 0 32px;
      font-size: 32px;
      font-weight: bold;
      text-align: center;
    }
    .meetInfo {
      margin: 28px 0 32px;
      span {
        font-size: 16px;
        font-weight: normal;
        &.tit {
          color: ${({ theme }: any) => theme.color.brand};
          font-weight: 600;
        }
      }
    }
    .price {
      font-size: 26px;
      font-weight: bold;
      text-align: left;
    }
  }
`;

const FavoriteButton = styled.button<{ favorite: boolean }>`
  width: 56px;
  height: 56px;
  border-radius: 4px;
  background: #f4eeea;
  background-image: url(${({ favorite }) =>
    favorite ? "/images/favorite_on.png" : "/images/favorite.png"});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 22px 27px;
`;

type Props = {
  imgurl: string;
};

function index({ data, id }: any) {
  const { imgurl, title, location, meetday, firstmeet, comment, price } = data;
  const firstMeetDay = dayjs(firstmeet);
  const startTime = useMemo(
    () => firstMeetDay.format(`MM/DD(${firstMeetDay.format("ddd")}) HH:mm`),
    [firstmeet]
  );

  const [session] = useSession();
  console.log(session);

  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(data?.favoriteduser.includes(session?.user?.uid));
  }, []);

  const variables = {
    _id: data?._id,
    favorite,
    userid: session?.user?.uid
  };
  const queryClient = useQueryClient();
  const favoriteMutation = useMutation(
    () => axios.post("/api/favorite", variables),
    {
      onMutate: async () => {
        await queryClient.cancelQueries(["detailViewData", data?._id]);
        const previousDetail = queryClient.getQueryData<any>([
          "detailViewData",
          data?._id
        ]);
        console.log("previousDetail", previousDetail);
        if (previousDetail) {
          if (!favorite) {
            queryClient.setQueryData<any>(["detailViewData", data?._id], {
              ...previousDetail,
              favoriteduser: [
                ...previousDetail.favoriteduser,
                session?.user.uid
              ]
            });
          } else {
            queryClient.setQueryData<any>(["detailViewData", data?._id], {
              ...previousDetail,
              favoriteduser: previousDetail.favoriteduser.filter(
                (el: any) => el !== session?.user.uid
              )
            });
          }
          setFavorite(data?.favoriteduser.includes(session?.user?.uid));
        }
      },
      // onSuccess: () => queryClient.invalidateQueries("detailViewData"),
      onError: (error, variables, context) => {
        // I will fire first
        console.log(error, variables);
      }
    }
  );

  console.log(data);

  let today = new Date();
  console.log(
    "firstmeet",
    firstmeet,
    today,
    dayjs(firstmeet) > dayjs(today),
    dayjs(today) > dayjs(firstmeet)
  );

  const linkPay = (id: string) => {
    if (session === null) {
      alert("로그인 후 결제 가능합니다.");
      return;
    }
    router.push(`/payment/${id}`);
  };

  return (
    <>
      {data?.genre !== "이벤트" ? (
        <WrapInfoCard>
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
              <FavoriteButton
                favorite={favorite}
                onClick={() => favoriteMutation.mutate()}
              />
              <Button color="brand" size="l" onClick={() => linkPay(id)}>
                달라지는 4개월, 지금 시작
              </Button>
            </div>
          </InfoCard>
        </WrapInfoCard>
      ) : (
        <WrapInfoCard>
          <InfoCard className="event">
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
          </InfoCard>
        </WrapInfoCard>
      )}
    </>
  );
}

export default index;
