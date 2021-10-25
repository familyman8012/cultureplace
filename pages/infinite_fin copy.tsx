/** @jsxImportSource @emotion/react */
import React, { useRef, Fragment } from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { InView } from "react-intersection-observer";
import Link from "next/link";
import { css } from "@emotion/react";
import Card from "../src/components/elements/Card";

const fetchAnime = async (page: any) => {
  const res = await axios.get(`/api/product?page=${page}`);
  console.log("res", res);
  return res.data;
};

export default function Home() {
  const page = useRef(1);

  const { data, fetchNextPage } = useInfiniteQuery(
    "top",
    async ({ pageParam = page.current }) => {
      const res = await fetchAnime(pageParam);
      page.current = page.current + 1;
      return res;
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: () => page.current,
    }
  );

  console.log(data);

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          padding: 5rem;
        `}
      >
        {(data?.pages || []).map((group: any[], i) => (
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
        ))}
        <div>111</div>
        <InView as="div" onChange={() => fetchNextPage()}>
          <span>test</span>
        </InView>
      </div>
    </>
  );
}
