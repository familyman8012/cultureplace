import React from "react";
import Header from "./Head";
import Footer from "./Foot";
import { LayoutWrap } from "./styles";

type Props = {
  children: React.ReactNode;
};

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
