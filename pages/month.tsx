import React, { useRef, Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { css } from "@emotion/react";
import Card from "../src/components/elements/Card";
import Layout from "../src/components/layouts";
import useIntersectionObserver from "../src/hooks/useIntersectionObserver";
import { useInfinity } from "@src/hooks/api/useInfinite";
import { Iinfinity, IProduct } from "@src/typings/db";
import InView from "react-intersection-observer";

export default function Home() {
  // 페이지 진입시 기존 데이터 덮어쓰지는 부분 방지
  // const queryClient = useQueryClient();
  // useEffect(() => {
  //   queryClient.invalidateQueries("day");
  // }, []);

  const { data, hasNextPage, fetchNextPage } = useInfinity("month");
  const loadMoreButtonRef = useRef(null);
  const [Load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
  }, []);

  // useIntersectionObserver({
  //   root: null,
  //   rootMargin: "200px",
  //   target: loadMoreButtonRef,
  //   onIntersect: fetchNextPage,
  //   enabled: hasNextPage
  // });

  return (
    <Layout>
      <React.Fragment>
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
          `}
        >
          {(data?.pages || []).map((group: Iinfinity, i: number) => {
            return (
              <Fragment key={i}>
                {group.products?.map((data: IProduct, i: number) => (
                  <Fragment key={i}>
                    <Link href={`/detailview/${data?._id}`}>
                      <a
                        css={css`
                          width: calc(25% - 24px);
                          margin: 12px;
                        `}
                      >
                        <Card data={data} />
                      </a>
                    </Link>
                  </Fragment>
                ))}
              </Fragment>
            );
          })}
          <div
            css={css`
              margin-top: 200px;
            `}
          >
            {Load && (
              <InView as="div" onChange={() => fetchNextPage()}>
                <span className="loadSelector">test</span>
              </InView>
            )}
            <div>111</div>
            {/* {Load && <div ref={loadMoreButtonRef} />} */}
          </div>
        </div>
      </React.Fragment>
    </Layout>
  );
}
