import styled from "@emotion/styled";

export const WrapInfoCard = styled.div`
  position: fixed;
  top: 110px;
  width: 1240px;
`;

export const InfoCard = styled.div`
  position: absolute;
  right: -100px;
  width: 350px;
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
          color: ${({ theme }) => theme.color.brand};
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

export const FavoriteState = styled.button<{ favorite: boolean }>`
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
