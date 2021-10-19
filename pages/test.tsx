import React from "react";
import Title from "../src/components/elements/Title";

import Layout from "../src/components/layouts";

import Notice from "../src/components/elements/Notice";
import Search from "../src/components/elements/Search";
import FloatingCard from "../src/components/elements/FloatingCard";

function Test() {
  return (
    <Layout>
      <div>
        <FloatingCard />
        <Title>오늘의 인기 TOP 10</Title>
        Test
        <img src="/images/arrowbtn.svg" />
        <Notice />
        <Search />
      </div>
    </Layout>
  );
}

export default Test;
