import styled from "@emotion/styled";
import { mq } from "@components/mq";

export const LayoutWrap = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  &.detail footer {
    display: none;
  }
`;

export const Header = styled.header`
  z-index: 100;
  width: 100%;
  height: 12.4rem;
  box-shadow: rgb(239 239 239) 0px -1px 0px inset;
  background: #fff;
  .inner {
    display: flex;
    position: relative;
    z-index: 100;
    align-items: center;
    width: 125rem;
    height: 7.2rem;
    margin: 0 auto;
  }
  h1 {
    position: relative;
    color: ${({ theme }) => theme.color.brand};
    font-size: 1.8rem;
    font-weight: 500;
    letter-spacing: -1px;
    padding-left: 6.5rem;

    &:before {
      position: absolute;
      content: "";
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 5.9rem;
      height: 5.4rem;
      background: url("/images/logo_hip.png") no-repeat center;
    }
  }
  aside {
    margin-left: auto;
    ul {
      ${mq[0]} {
        display: none;
      }
      display: flex;
      margin-left: 1rem;
      li {
        font-size: 1.4rem;
        font-weight: normal;
        color: rgb(26, 26, 26);
        line-height: 2rem;
        letter-spacing: -0.15px;
        margin: 0rem 2.4rem 0rem 0px;
        position: relative;
        &.my {
          color: #ff5600;
        }
      }
    }
  }
  ${mq[0]} {
    height: 60px;
    padding: 11px 20px;
    h1 {
      display: none;
      padding-left: 11rem;
      font-size: 14px;
      background-size: 10px;
      font-weight: bold;
      &:before {
        width: 49px;
        height: 45px;
        background: url(/images/logo_hip.png) no-repeat center;
        background-size: cover;
      }
    }
    .inner {
      width: auto;
      height: 100%;
      justify-content: center;
    }
  }
`;

export const MenuArea = styled.ul`
  ${mq[0]} {
    display: none;
  }
  display: flex;
  width: 125rem;
  height: 5.2rem;
  align-items: center;
  margin: 0 auto;
  li {
    height: 2.9rem;
    margin-right: 4rem;
    &:hover {
      border-bottom: 2px solid;
    }
    a,
    .depth1 {
      display: block;
      height: 2.9rem;
      font-size: 1.6rem;
      font-weight: 400;
      padding-bottom: 0.5rem;
      color: #000;
    }
  }

  .categoryLink {
    position: relative;
    z-index: 100;
    .depth1 {
      display: flex;
      svg {
        display: block;
        margin: 1px 0 0 1rem;
      }
    }

    &.on .depth1 svg {
      margin-top: 0.7rem;
      transform: rotateX(180deg);
    }

    .categoryMenu {
      display: none;
    }

    &.on .categoryMenu {
      display: block;

      position: absolute;
      top: 3rem;
      left: 0;
      width: 18rem;
      padding: 0px 1.2rem;
      border: 1px solid rgb(239, 239, 239);
      background: #fff;

      a {
        padding: 0.8rem 0.8rem 0.8rem 0.2rem;
        font-size: 1.4rem;
        line-height: 1.8rem;
        margin: 0px;
        color: rgb(26, 26, 26);
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        justify-content: space-between;
        font-weight: normal;
        cursor: pointer;
        border: none;
      }
    }
  }
`;

export const SearchForm = styled.form`
  position: relative;
  margin-left: 2.4rem;
  .btn-search {
    position: absolute;
    top: 1.2rem;
    left: 1.2rem;
    width: 1.2rem;
    height: 1.2rem;
    margin-right: 0.6rem;
    color: #666666;
    background: url("/images/ic-search-g.svg") no-repeat center;
    background-size: 1.2rem auto;
  }
  input[type="text"] {
    width: 32.2rem;
    height: 3.4rem;
    padding: 0 1rem 0 3rem;
    font-size: 14px;
    line-height: 1.5;
    border: 1px solid #d9d9d9;
    border-radius: 0.6rem;
    background-color: #ffffff;
    outline: 0;
    caret-color: #000000;
    &::placeholder {
      color: #cccccc;
    }
  }
  ${mq[0]} {
    display: flex;
    margin-left: 0;
    position: relative;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    height: 38px;
    padding: 0px 12px;
    border-radius: 19px;
    background-color: rgb(244, 244, 244);
    border: none;
    .btn-search {
      position: static;
      width: 19px;
      height: 19px;
      background-size: 17px;
      margin: 0 10px 0 5px;
      background: url("/images/ic-search-g2.svg") no-repeat center;
    }
    input[type="text"] {
      width: 100%;
      height: 24px;
      padding-left: 0;
      background: transparent;
      border: none;
    }
  }
`;

export const Login = styled.div`
  ${mq[0]} {
    display: none;
  }
  color: ${({ theme }) => theme.color.brand};
`;

export const LoggedIn = styled.div`
  ${mq[0]} {
    display: none;
  }
  display: block;
  overflow: hidden;
  width: 3.6rem;
  height: 3.6rem;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  cursor: pointer;
  background-image: url(//img.taling.me/Content/Images/placeholders/profile-default.thumb.jpg);
  background-position: center;
  background-size: cover;
`;

export const MyPageLayer = styled.div`
  z-index: 10;
  background: #fff;
  border: 1px solid #cc39d8;
  color: #fff;
  font-size: 1.4rem;
  padding: 0 1em;
  position: relative;
  text-align: center;
  vertical-align: top;
  width: max-content;
  position: absolute;
  top: 5.2rem;
  left: -2.2rem;
  border-radius: 0.5rem;
  &:after {
    border: 0.5em solid transparent;
    border-top-color: #cc39d8;
    content: "";
    margin-left: -0.5em;
    position: absolute;
    top: -1.5rem;
    left: 50%;
    width: 0;
    height: 0;
    transform: rotate(180deg);
  }
  li {
    padding: 0.5rem 0;
    color: #000;
    font-weight: normal;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;

export const Footer = styled.div`
  display: block;
  width: 100%;
  padding: 5.6rem 0 5.2rem;
  background-color: #f7f7f5;
  * {
    margin-bottom: 0;
  }
  .inner {
    max-width: 114rem;
    margin: 0 auto;
  }
  .link_menu {
    display: flex;
    li {
      margin-right: 5rem;
    }
  }
  .compaynyInfo {
    h1 {
      margin-bottom: 1rem;
    }
    p {
      font-size: 11px;
      color: ${({ theme }) => theme.color.lightgray};
    }
  }
  .link_policy {
    display: flex;
    li {
      margin-right: 1rem;
      font-size: 1.2rem;
    }
  }
  ${mq[0]} {
    padding: 20px;
  }
`;

export const MobileMenu = styled.footer`
  display: none;
  ${mq[0]} {
    display: flex !important;

    justify-content: space-around;
    -webkit-box-align: center;
    align-items: center;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: calc(56px + env(safe-area-inset-bottom));
    padding-bottom: env(safe-area-inset-bottom);
    z-index: 900;
    background-color: rgb(255, 255, 255);
    border-top: 1px solid rgb(244, 244, 244);
    span {
      width: 48px;
      height: 48px;
      display: flex;
      flex-direction: column;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      font-size: 10px;
      line-height: 14px;
      letter-spacing: -0.3px;
      color: rgb(119, 119, 119);
      &.on {
        color: rgb(0, 117, 239);
      }
    }
  }
`;
