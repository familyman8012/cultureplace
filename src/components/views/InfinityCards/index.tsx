import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { css } from "@emotion/react";
import Card from "@src/components/elements/Card";
import Layout from "@src/components/layouts";
import { useInfinity } from "@src/hooks/api/useInfinite";
import { Iinfinity, IProduct } from "@src/typings/db";
import InView from "react-intersection-observer";

interface IQuerykey {
  querykey: string;
}

export default function Infinity({ querykey }: IQuerykey) {
  const { data, error, fetchNextPage, status } = useInfinity(querykey);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
  }, []);

  return (
    <Layout>
      <React.Fragment>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : status === "error" ? (
          <p>Error</p>
        ) : (
          <div
            css={css`
              display: flex;
              flex-wrap: wrap;
              margin-top: 61px;
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
                          <Card data={data} querykey={querykey} />
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
              {load && (
                <InView as="div" onChange={() => fetchNextPage()}>
                  <span className="loadSelector">test</span>
                </InView>
              )}
            </div>
          </div>
        )}
      </React.Fragment>
    </Layout>
  );
}
