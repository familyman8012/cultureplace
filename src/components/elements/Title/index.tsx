import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
  url?: string;
};

const TitleArea = styled.div`
  display: flex;
  h2 {
    font-size: 2.4rem;
    line-height: 1;
  }
  a {
    margin-left: auto;
    align-items: center;
    font-size: 1.6rem;
    color: ${({ theme }: any) => theme.color.sub};
  }
`;

function Title({ children, url = "/" }: Props) {
  return (
    <TitleArea>
      <h2>{children}</h2>
      <Link href={url}>
        <a>전체보기</a>
      </Link>
    </TitleArea>
  );
}

export default Title;
