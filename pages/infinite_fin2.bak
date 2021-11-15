/** @jsxImportSource @emotion/react */
import React, { useRef, Fragment } from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { InView } from "react-intersection-observer";
import Link from "next/link";
import { css } from "@emotion/react";
import Card from "../src/components/elements/Card";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Product from "../pages/api/models/product";
import dbConnect from "./api/middleware/dbConnect";
import { fetchPosts } from "../src/hooks/api/useInfinite";

export default function Home({ SsrData }: any) {
  const page = useRef(1);
  const { data, fetchNextPage } = useInfiniteQuery(
    "posts",
    async ({ pageParam = page.current }) => fetchPosts(SsrData)
  );

  // const { data, fetchNextPage } = useInfiniteQuery(
  //   "posts",
  //   async ({ pageParam = page.current }) => {
  //     const res = await fetchPosts(SsrData);
  //     console.log("pageParam", pageParam, "화면 res", res);
  //     page.current = page.current + 1;
  //     return res;
  //   },
  //   {
  //     refetchOnWindowFocus: false,
  //     getNextPageParam: () => page.current,
  //   }
  // );

  console.log("인피니트data", data);

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          padding: 5rem;
        `}
      >
        <div>1</div>
        {data?.pages?.map((el: any) => {
          console.log("infinite el은", el);
          return (
            <>
              {products?.map((data) => (
                <Card data={el} />
              ))}
            </>
          );
        })}
        {/* {(data?.pages || []).map((group: any[], i) => (
          <Fragment key={i}>
            {group.map((data: any, key: React.Key | null | undefined) => (
              <Link href="/detail/1">
                <Card
                  key={key}
                  data={data}
                  css={css`
                    width: 33.3%;
                  `}
                />
              </Link>
            ))}
          </Fragment>
        ))} */}
        <div>111</div>
        {/* <InView as="div" onChange={() => fetchNextPage()}>
          <span>test</span>
        </InView> */}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await dbConnect();

  const result = await Product.find(
    {},
    { createdAt: false, updatedAt: false }
  ).limit(9);

  function createSSrData(data: any) {
    const sData = data.map((doc: any) => {
      const newData = doc.toObject();
      for (var temp in newData) {
        if (typeof newData[temp] !== "string") {
          newData[temp] = newData[temp].toString();
        }
      }
      return newData;
    });
    return sData;
  }

  console.log("createSSrData(result)", createSSrData(result).length);

  const SsrData = {
    products: createSSrData(result),
  };

  await queryClient.prefetchQuery("posts", () => fetchPosts(SsrData));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      SsrData,
    },
  };
}
