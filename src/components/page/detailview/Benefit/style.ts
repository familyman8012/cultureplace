import styled from "@emotion/styled";

export const BenefitTxt = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

export const BenefitWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  dl {
    width: 45%;
    margin-bottom: 17px;
  }
  dt {
    margin-bottom: 4px;
    padding-left: 22px;
    background: url("/images/benefit1.webp") no-repeat left top;
    background-size: 19px 22px;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.56;
    letter-spacing: -0.43px;
  }
`;

export const BenefitList = styled.dl<{ bgimg: string }>`
  width: 50%;
  margin-bottom: 17px;
  dt {
    margin-bottom: 4px;
    padding-left: 22px;
    background: url(${({ bgimg }: any) => bgimg}) no-repeat left top;
    background-size: 19px 22px;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.56;
    letter-spacing: -0.43px;
  }
`;
