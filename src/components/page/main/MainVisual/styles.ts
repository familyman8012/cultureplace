import styled from "@emotion/styled";

export const Mainvis = styled.div`
  overflow: hidden;
  border-radius: 8px;
  padding-top: 72px;
  .swiper-slide {
    width: 1903px;
    height: 460px;
    &:nth-of-type(1) {
      background: url("/images/mainbg_1_2_bak.jpg") no-repeat left top;
    }
    &:nth-of-type(2) {
      background: blue;
    }
    &:nth-of-type(3) {
      background: green;
    }
    .inner {
      display: flex;
      width: 1280px;
      height: 100%;
      margin: 0 auto;
      align-items: center;
      color: #fff;

      .txtbox {
        opacity: 0;
        transform: translateX(30px);
        transition: 1s all;

        h2 {
          font-size: 36px;
        }
        p {
          margin-top: 20px;
          font-size: 18px;
        }
        a {
          display: block;
          width: 173px;
          margin-top: 36px;
          color: #0d86e1;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          line-height: 50px;
          border-radius: 100px;
          cursor: pointer;
          background: #fff;
        }
      }
      &.on .txtbox {
        opacity: 1;
        transform: translateX(0px);
      }
      .imgbox {
        margin-left: auto;
        transform: rotate(0);
      }
      &.on .imgbox {
        animation: rotate 2s;
      }
      @keyframes rotate {
        0% {
          opacity: 0;
          transform: scale(0.2) rotate(20deg);
        }
        10% {
          transform: scale(0.3) rotate(0);
        }
        25% {
          transform: scale(0.4) rotate(-20deg);
        }
        30% {
          transform: scale(0.5) rotate(0);
        }
        50% {
          transform: scale(0.6) rotate(0);
        }
        65% {
          transform: scale(0.4) rotate(20deg);
        }
        70% {
          transform: scale(0.8) rotate(0);
        }
        75% {
          transform: scale(0.9) rotate(-20deg);
        }
        80% {
          transform: scale(1) rotate(0);
        }
        100% {
          opacity: 100%;
          transform: scale(1);
        }
      }
    }
  }
`;
