import React from "react";
import Header from "./Head";
import Footer from "./Foot";
import { LayoutWrap } from "./styles";

type Props = {
  children: React.ReactNode;
  type?: string;
};

function Layout({ children, type = "basic" }: Props) {
  return (
    <>
      <LayoutWrap type={type}>
        <Header />
        {children}
      </LayoutWrap>

      <Footer />
    </>
  );
}

export default Layout;
