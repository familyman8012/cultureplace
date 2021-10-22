import React from "react";
import Header from "./Head";
import Footer from "./Foot";
import styled from "@emotion/styled";

type Props = {
  children: React.ReactNode;
};

const LayoutWrap = styled("div")`
  max-width: 110rem;
  margin: 0 auto;
  padding: 0;
`;

function Layout({ children }: Props) {
  return (
    <>
      <LayoutWrap>
        <Header />
        {children}
      </LayoutWrap>

      <Footer />
    </>
  );
}

export default Layout;
