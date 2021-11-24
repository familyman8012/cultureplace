import styled from "@emotion/styled";
import React, { Children } from "react";

const SectionWrap = styled.section`
  margin-top: 30px;
  padding: 30px;
  border-top: 1px solid #f3f3f6;
`;

function index({ children, ...rest }: any) {
  return <SectionWrap {...rest}>{children}</SectionWrap>;
}

export default index;
