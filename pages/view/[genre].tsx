import { css } from "@emotion/react";
import Card from "@src/components/elements/Card";
import Layout from "@src/components/layouts";
import { fetchProducts, useProducts } from "@src/hooks/api/useProducts";
import { IProduct } from "@src/typings/db";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect, useState } from "react";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import CardSkeleton from "@src/components/elements/Card/CardSkeleton";

function Oneday() {
  const router = useRouter();
  const { genre } = router.query;

  useEffect(() => {
    setCurPage(1);
  }, [genre]);

  const [pageSize, setPageSize] = useState(20);
  const [curPage, setCurPage] = useState(1);
  const { data, error, isLoading, refetch } = useProducts(
    pageSize,
    curPage,
    String(genre)
  );

  const handlePageChange = useCallback((page: number) => {
    setCurPage(page);
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div
        css={css`
          width: 1280px;
          margin: 50px auto;
        `}
      >
        <div
          css={css`
            display: grid;
            gap: 22px 27px;
            grid-template-columns: 1fr 1fr 1fr 1fr;
          `}
        >
          {isLoading &&
            Array.from({ length: 4 }).map((_, idx) => (
              <CardSkeleton key={idx} />
            ))}
          {!isLoading &&
            data?.products?.map((el: IProduct, i: number) => (
              <Fragment key={i}>
                <Link href={`/detailview/${el?._id}`}>
                  <a>
                    <Card data={el} querykey={`${genre},${curPage}`} />
                  </a>
                </Link>
              </Fragment>
            ))}
        </div>
        <Pagination
          css={css`
            width: fit-content;
            margin: 0 auto;
          `}
          onChange={handlePageChange}
          current={curPage}
          pageSize={pageSize}
          total={data?.productsCount}
        />
      </div>
    </Layout>
  );
}

export default Oneday;
