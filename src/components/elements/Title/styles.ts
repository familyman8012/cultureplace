import styled from "@emotion/styled";

export const TitleArea = styled.div<{ type: string }>`
  display: flex;
  margin: 12rem 1rem 3.6rem;
  ${({ type }) => type === "first" && "margin-top : 6rem"};

  h2 {
    font-size: 2.4rem;
    font-weight: 500;
    line-height: 1;
  }
  a {
    margin-left: auto;
    align-items: center;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.color.gray};
  }
`;
