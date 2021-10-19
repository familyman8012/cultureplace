import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Title from "../src/components/elements/Title";

import Layout from "../src/components/layouts";
import { fetchPosts } from "../src/hooks/api/usePosts";
import Product from "../pages/api/models/product";
import dbConnect from "./api/middleware/dbConnect";
import Card from "../src/components/elements/Card";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

const Home = ({ products }: any) => {
  const { status, data, error } = useQuery("posts", () => fetchPosts(products));

  return (
    <Layout>
      <React.Fragment>
        <Title>곧 시작되는 모임 TOP 10</Title>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {data?.map((el: any, i: number) => (
            <Card key={el.id} data={data[i]} />
          ))}
        </div>
      </React.Fragment>
    </Layout>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await dbConnect();
  const result = await Product.find({}, { createdAt: false, updatedAt: false });

  const products = result.map((doc) => {
    const product = doc.toObject();
    product._id = product._id.toString();
    product.firstmeet = product.firstmeet.toString();
    return product;
  });

  await queryClient.prefetchQuery("posts", () => fetchPosts(products));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      products,
    },
  };
}

export default Home;
