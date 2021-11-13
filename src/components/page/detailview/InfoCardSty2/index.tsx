import styled from "@emotion/styled";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import "dayjs/locale/ko";
import Button from "../../../elements/Button";

dayjs.locale("ko");

const WrapInfoCard = styled.div`
  position: fixed;
  top: 110px;
  width: 1240px;
`;

const InfoCard = styled.div`
  position: absolute;
  left: 0;
  width: 380px;
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

function index({ data }: any) {
  console.log(data);
  // const { imgurl, title, location, meetday, firstmeet, comment, price } = data;
  // const firstMeetDay = dayjs(firstmeet);
  // const startTime = useMemo(
  //   () => firstMeetDay.format(`MM/DD(${firstMeetDay.format("ddd")}) HH:mm`),
  //   [firstmeet]
  // );

  // const [favorite, setFavorite] = useState(false);

  // const handleFavortie = () => {
  //   setFavorite(prev => !prev);
  // };

  return (
    <div>112312312312</div>
    // <WrapInfoCard>
    //   <InfoCard>
    //     <img src={imgurl} width="100%" alt="" />
    //     <h2>{title}</h2>
    //     <div className="meetInfo">
    //       <div>
    //         <span>{location} |</span> <span>{meetday}</span>
    //       </div>
    //       <div>
    //         <span>첫 모임일</span> <span>{startTime}</span>
    //       </div>
    //     </div>
    //     <div className="comment">#{comment}</div>
    //     <div className="price">{price}원</div>
    //     <div className="box_btn">
    //       <FavoriteButton favorite={favorite} onClick={handleFavortie} />
    //       <Button color="brand" size="l">
    //         달라지는 4개월, 지금 시작
    //       </Button>
    //     </div>
    //   </InfoCard>
    // </WrapInfoCard>
  );
}

export default index;
