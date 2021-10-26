/** @jsxImportSource @emotion/react */
import React, { useRef, Fragment, LegacyRef, useEffect } from "react";
import axios from "axios";
import { QueryClient, useInfiniteQuery, useQueryClient } from "react-query";

import Link from "next/link";
import { css } from "@emotion/react";
import Card from "../src/components/elements/Card";
import Layout from "../src/components/layouts";
import useIntersectionObserver from "../src/hooks/useIntersectionObserver";
import { KMS } from "aws-sdk";

const fetchAnime = async (page: any) => {
  const res = await axios.get(`/api/product?meetingcycle=1day&limit=8&page=${page}&genre=이벤트`);
  return res.data;
};

export default function Home() {

    // 페이지 진입시 기존 데이터 덮어쓰지는 부분 방지
    const queryClient = useQueryClient()
    useEffect(() => {
      queryClient.invalidateQueries('event1')
    }, [])
    
  const pageNum = useRef(1);

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    "event1",
    async ({ pageParam = pageNum.current }) => {
      const res = await fetchAnime(pageParam);
      pageNum.current = pageNum.current + 1;
      return res;
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage: any) => {
        console.log("pageNum.current", pageNum.current, "lastPage.totalPages", lastPage.totalPages)
        return pageNum.current < lastPage.totalPages ? pageNum.current : undefined ;
      },
      // getNextPageParam: (lastPage: any) => pageNum.current,
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

  return (
    <Layout>
      <React.Fragment>
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
          `}
        >
          {(data?.pages || []).map((group: any[], i) => {
            console.log("group", group);
            return (
              <Fragment key={i}>
                {group.products?.map((data: any, key?: React.Key) => (
                  <Link href="/detail/1">
                    <Card                    
                      key={key}
                      data={data}
                      type="event"
                      css={css`
                        width: calc(25% - 24px);
                        margin: 12px;
                      `}
                    />
                  </Link>
                ))}
              </Fragment>
            );
          })}
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
        </div>
      </React.Fragment>
    </Layout>
  );
}
