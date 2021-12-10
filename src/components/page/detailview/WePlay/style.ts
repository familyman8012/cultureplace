import styled from "@emotion/styled";

export const PlayList = styled.div`
  display: flex;
  width: 690px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Play = styled.dl<{ bgimg: string }>`
  width: 49%;
  margin-bottom: 30px;
  padding-top: 78px;
  background: url(${({ bgimg }) => bgimg}) no-repeat left top;
  background-size: auto 57.5px;
  dt {
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.brand};
    line-height: 24px;
  }
  dd {
    width: 290px;
  }
  .desc {
    font-size: 15px;
  }
  .subdesc {
    font-size: 13px;
    color: ${({ theme }) => theme.color.gray};
  }
`;
