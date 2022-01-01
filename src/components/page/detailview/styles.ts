import styled from "@emotion/styled";

export const DetailViewWrap = styled.div`
  max-width: 1240px;
  min-height: 100vh;
  margin: 5rem auto;
`;

export const Content = styled.div`
  width: calc(100% - 380px);
  margin-top: 30px;
  &.event {
    margin-left: calc(320px + 5%);
    InfoCard {
      left: 0;
      right: auto;
    }
  }
`;

export const EditTxt = styled.div`
  * {
    font-size: 18px;
    line-height: 1.8;
  }

  h2 {
    font-size: 28px;
    font-weight: bold;
  }
  li {
    margin-left: 5rem;
    list-style: disc;
  }
  .ql-align-center {
    text-align: center;
  }
  .ql-size-small {
    display: block;
    font-size: 14px;
    line-height: 1.5;
  }
  hr {
    border-top: none;
  }
`;
