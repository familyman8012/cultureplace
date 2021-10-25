/** @jsxImportSource @emotion/react */
import React, { useRef, Fragment, LegacyRef } from "react";
import axios from "axios";
import { QueryClient, useInfiniteQuery } from "react-query";
import { InView } from "react-intersection-observer";
import Link from "next/link";
import { css } from "@emotion/react";
import Card from "../src/components/elements/Card";
import Layout from "../src/components/layouts";
import useIntersectionObserver from "../src/hooks/useIntersectionObserver";

const fetchAnime = async (page: any) => {
  const res = await axios.get(`/api/product?meetingcycle=1month&page=${page}`);
  console.log("res", res);
  return res.data;
};

export default function Home() {
  const pageNum = useRef(1);

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    "month",
    async ({ pageParam = pageNum.current }) => {
      const res = await fetchAnime(pageParam);
      pageNum.current = pageNum.current + 1;
      return res;
    },
    {
      refetchOnWindowFocus: false,
      // getNextPageParam: () => page.current,
      getNextPageParam: (lastPage: any) => {
        return pageNum < lastPage.totalPages ? undefined : pageNum.current;
      },
      staleTime: 3000,
    }
  );

  const loadMoreButtonRef = React.useRef(null);

  useIntersectionObserver({
    root: null,
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  console.log("data", data, "hasNextPage", hasNextPage);

  return (
    <Layout>
      <React.Fragment>
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
          `}
        >
          {(data?.pages || []).map((group: any[], i) => (
            <Fragment key={i}>
              {group.products?.map((data: any, key?: React.Key) => (
                <Link href="/detail/1">
                  <Card
                    key={key}
                    data={data}
                    type="other"
                    css={css`
                      width: calc(25% - 24px);
                      margin: 12px;
                    `}
                  />
                </Link>
              ))}
            </Fragment>
          ))}
        </div>
        <div
          css={css`
            margin-top: 200px;
          `}
        >
          <div>111</div>
          {/* <InView as="div" onChange={() => fetchNextPage()}>
              <span className="loadSelector">test</span>
            </InView> */}
          <div ref={loadMoreButtonRef} />
        </div>
      </React.Fragment>
    </Layout>
  );
}
