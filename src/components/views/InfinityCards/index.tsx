import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import Link from "next/link";
import { css } from "@emotion/react";
import Card from "@src/components/elements/Card";
import Layout from "@src/components/layouts";
import { useInfinity } from "@src/hooks/api/useInfinite";
import { Iinfinity, IProduct } from "@src/typings/db";
import InView from "react-intersection-observer";
import { InfinityCardwrap, LinkCard } from "./style";
import Search from "@src/components/views/Search";

interface IQuerykey {
  querykey: string;
  type?: string;
}

export interface ISearchCondition {
  searchInput?: string | undefined;
  filterFind: string[] | undefined;
}

export default function Infinity({ querykey, type }: IQuerykey) {
  const pageNum = useRef(1);

  const { data, error, fetchNextPage, status, refetch } = useInfinity(
    querykey,
    pageNum
  );

  return (
    <Layout>
      <React.Fragment>
        {(querykey === "oneday" || querykey === "month") && (
          <Search pageNum={pageNum} refetch={refetch} />
        )}

        {status === "loading" ? (
          <p>Loading...</p>
        ) : status === "error" ? (
          <p>Error</p>
        ) : (
          <InfinityCardwrap type={type}>
            {(data?.pages || []).map((group: Iinfinity, i: number) => {
              return (
                <Fragment key={i}>
                  {group.products?.map((data: IProduct, i: number) => (
                    <Fragment key={i}>
                      <Link href={`/detailview/${data?._id}`}>
                        <LinkCard>
                          <Card data={data} querykey={querykey} type={type} />
                        </LinkCard>
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
              <InView
                as="div"
                rootMargin="0px 0px 0px 300px"
                onChange={() => fetchNextPage()}
              >
                <span className="loadSelector">test</span>
              </InView>
            </div>
          </InfinityCardwrap>
        )}
      </React.Fragment>
    </Layout>
  );
}
