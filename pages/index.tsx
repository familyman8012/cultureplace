import Link from "next/link";
import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { fetchPosts } from "../src/hooks/api/usePosts";
import Product from "../pages/api/models/product";
import dbConnect from "./api/middleware/dbConnect";

const Home = ({ products }: any) => {
  // const { isLoading, error, data } = useQuery<any, Error>("posts", () =>
  //   fetchPosts()
  // );

  const { status, data, error } = useQuery("posts", () => fetchPosts(products));
  // console.log(data);
  // if (isLoading) return <div>Loading</div>;
  // if (error) return "An error has occurred: " + error?.message;

  return (
    <>
      <Link href="/test">
        <a>test페이지로</a>
      </Link>
      <ul>
        {data?.map((post: any) => (
          <li key={post._id}>
            <div>
              <a href="#">{post.title}</a>
            </div>
          </li>
        ))}
      </ul>
    </>
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
