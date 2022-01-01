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

function Oneday() {
  const router = useRouter();
  const { genre } = router.query;

  useEffect(() => {
    setCurPage(1);
  }, [genre]);

  const [pageSize, setPageSize] = useState(5);
  const [curPage, setCurPage] = useState(1);
  const { data, error, status, refetch } = useProducts(
    pageSize,
    curPage,
    String(genre)
  );

  const handlePageChange = useCallback((page: number) => {
    setCurPage(page);
  }, []);

  return (
    <Layout>
      <div
        css={css`
          width: 1280px;
          margin: 0 auto;
          display: grid;
          gap: 22px 27px;
          grid-template-columns: 1fr 1fr 1fr 1fr;
        `}
      >
        {data?.products?.map((el: IProduct, i: number) => (
          <Fragment key={i}>
            <Link href={`/detailview/${el?._id}`}>
              <a>
                <Card data={el} />
              </a>
            </Link>
          </Fragment>
        ))}
      </div>
      <Pagination
        onChange={handlePageChange}
        current={curPage}
        pageSize={pageSize}
        total={data?.productsCount}
      />
    </Layout>
  );
}

export default Oneday;
