import styled from "@emotion/styled";

export const LayoutWrap = styled.div`
max-width:100%
  margin: 0 auto;
  padding: 0;
`;

export const Header = styled.header`
  z-index: 100;
  width: 100%;
  height: 124px;
  box-shadow: rgb(239 239 239) 0px -1px 0px inset;
  background: #fff;
  .inner {
    display: flex;
    position: relative;
    z-index: 100;
    align-items: center;
    width: 1250px;
    height: 72px;
    margin: 0 auto;
  }
  h1 {
    position: relative;
    color: ${({ theme }) => theme.color.brand};
    font-size: 18px;
    font-weight: 500;
    letter-spacing: -1px;
    padding-left: 65px;

    &:before {
      position: absolute;
      content: "";
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 59px;
      height: 54px;
      background: url("/images/logo_hip.png") no-repeat center;
    }
  }
  aside ul {
    display: flex;
    margin-left: 10px;
    li {
      font-size: 14px;
      font-weight: normal;
      color: rgb(26, 26, 26);
      line-height: 20px;
      letter-spacing: -0.15px;
      margin: 0px 24px 0px 0px;
      position: relative;
      &.my {
        color: #ff5600;
      }
    }
  }
`;

export const MenuArea = styled.ul`
  display: flex;
  width: 1250px;
  height: 52px;
  align-items: center;
  margin: 0 auto;
  li {
    height: 29px;
    margin-right: 4rem;
    &:hover {
      border-bottom: 2px solid;
    }
    a,
    .depth1 {
      display: block;
      height: 29px;
      font-size: 16px;
      font-weight: 400;
      padding-bottom: 5px;
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
        margin: 1px 0 0 10px;
      }
    }

    &.on .depth1 svg {
      margin-top: 7px;
      transform: rotateX(180deg);
    }

    .categoryMenu {
      display: none;
    }

    &.on .categoryMenu {
      display: block;

      position: absolute;
      top: 30px;
      left: 0;
      width: 180px;
      padding: 0px 12px;
      border: 1px solid rgb(239, 239, 239);
      background: #fff;

      a {
        padding: 8px 8px 8px 20px;
        font-size: 14px;
        line-height: 18px;
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
  margin-left: 24px;
  .btn-search {
    position: absolute;
    top: 12px;
    left: 12px;
    width: 12px;
    height: 12px;
    margin-right: 6px;
    color: #666666;
    background: url("/images/ic-search-g.svg") no-repeat center;
    background-size: 12px auto;
  }
  input[type="text"] {
    width: 322px;
    height: 34px;
    padding: 0 10px 0 30px;
    font-size: 14px;
    line-height: 1.5;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    background-color: #ffffff;
    outline: 0;
    caret-color: #000000;
  }
`;

export const Login = styled.div`
  margin-left: auto;
  color: ${({ theme }) => theme.color.brand};
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
      font-size: 12px;
    }
  }
`;
