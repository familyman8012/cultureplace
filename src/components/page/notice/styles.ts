import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const NoticeView = styled.div`
  width: 840px;
  margin: 0 auto;
  .top {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.color.brand};
    .anticon-left {
      font-size: 10px;
      margin-right: 15px;
    }
  }
  h2 {
    font-size: 26px;
  }
  h3 {
    margin-bottom: 8px;
  }
  img {
    display: block;
    margin: 32px 0;
  }
`;

export const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin: 26px;
  text-align: center;
`;

export const CreateAt = styled.div`
  font-size: 14px;
  color: rgb(123, 123, 123);
  text-align: center;
`;

export const NoticeButton = css`
  display: block;
  margin: 100px auto;
  height: 46px;
  border-radius: 28px;
`;

export const SectionNotice = styled.div`
  width: 1100px;
  margin: 50px auto;
`;
export const TabNotice = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 16px 0;
  li {
    padding: 4px 12px;
    font-size: 16px;
    &.on {
      font-weight: bold;
      border-bottom: 2px solid rgb(255, 121, 0);
    }
  }
`;

export const WrapNotice = styled.div`
  display: grid;
  gap: 85px 10px;
  grid-template-columns: 1fr 1fr 1fr;
`;
