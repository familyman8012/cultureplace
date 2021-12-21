import styled from "@emotion/styled";
import { transform } from "lodash";

export const Mainvis = styled.div`
  overflow: hidden;
  position: relative;
`;

export const SlideItem = styled.div<{ i: number; on: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 1903px;
  height: 655px;
  .txtbox {
    opacity: 0;
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    transition: 1s all;
    p {
      color: #fff;
      letter-spacing: -3px;
      line-height: 1;
      text-align: center;
    }
    .txt1,
    .txt2 {
      font-family: OTWelcomeBA;
    }
    .txt1 {
      font-size: 50px;
    }
    .txt2 {
      font-size: 77px;
      margin: 15px 0 10px;
    }
    .txt3 {
      letter-spacing: 0;
      line-height: 1.5;
    }
    a {
      display: block;
      width: 155px;
      height: 48px;
      line-height: 48px;
      margin: 20px auto 0;
      text-align: center;
      font-family: auto;
      font-size: 14px;
      background: rgb(255, 217, 54);
      &:hover {
        background: rgb(218, 178, 0);
      }
    }
  }
  background: url(/images/mainvis${({ i }) => i}.jpg) no-repeat left top;
  ${({ on }) =>
    on === "on" &&
    `.txtbox {
    opacity: 1;
    transform: translate(-50%, -60%);
    
  }`}
`;

export const TxtBox = styled.div``;
