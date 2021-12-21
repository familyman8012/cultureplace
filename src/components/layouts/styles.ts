import styled from "@emotion/styled";

export const LayoutWrap = styled.div`
max-width:100%
  margin: 0 auto;
  padding: 0;
`;

export const Header = styled.header`
  z-index: 100;
  width: 100%;
  height: 72px;
  background: #fff;
  .inner {
    display: flex;
    align-items: center;
    width: 1250px;
    height: 100%;
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
  ul {
    display: flex;
    margin: 0 0 0 24px;
    li {
      margin-right: 4rem;
      a {
        font-size: 14px;
        font-weight: 300;
        color: ${({ theme }) => theme.color.gray};
        &:hover {
          color: ${({ theme }) => theme.color.brand};
        }
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
  display: none;
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
    margin: 5.4rem 0 1.5rem;
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
