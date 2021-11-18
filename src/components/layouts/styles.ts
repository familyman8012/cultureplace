import styled from "@emotion/styled";

export const LayoutWrap = styled("div")`
  max-width: 110rem;
  margin: 0 auto;
  padding: 0;
`;

export const Header = styled.div<{ type: string }>`
  position: fixed;
  top: ${({ type }) => (type === "normal" ? "0" : "-61px")};
  transition: top 1s ease 0s;
  display: flex;
  width: 1100px;
  padding: 1.7rem 0 1.8rem;
  z-index: 1000;
  background: #fff;
  h1 {
    color: ${({ theme }) => theme.color.brand};
  }
  ul {
    display: flex;
    margin: 0 auto;
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

export const Login = styled.div`
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
