import { css } from "@emotion/react";
import Card from "@components/elements/Card";
import Layout from "@components/layouts";
import { fetchProducts, useProducts } from "@src/hooks/api/useProducts";
import { IProduct } from "@src/typings/db";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect, useState } from "react";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import CardSkeleton from "@components/elements/Card/CardSkeleton";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { dbConnect, Product } from "../../pages/api";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { CategoryLink } from "@components/layouts/Head";
import { WrapCategoryView } from "@components/pageComp/categoryview/styles";
import { PaginationStyle } from "@components/elements/PaginationStyle/styles";

function Oneday({ SsrData }: any) {
  const router = useRouter();
  const { genre } = router.query;

  const [pageSize, setPageSize] = useState(20);
  const [showPage, setShowPage] = useState(true);
  const [curPage, setCurPage] = useState(1);
  const { data, error, isLoading, isFetching, refetch } = useProducts(
    pageSize,
    curPage,
    String(genre),
    undefined,
    SsrData
  );

  useEffect(() => {
    setShowPage(false);
    setCurPage(1);
    setShowPage(true);
  }, [genre]);

  const handlePageChange = useCallback((page: number) => {
    setCurPage(page);
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <WrapCategoryView>
        <div>
          {isLoading &&
            Array.from({ length: 4 }).map((_, idx) => (
              <CardSkeleton key={idx} />
            ))}
          {!isLoading &&
            showPage &&
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
          css={PaginationStyle}
          onChange={handlePageChange}
          current={curPage}
          pageSize={pageSize}
          total={data?.productsCount}
        />
      </WrapCategoryView>
    </Layout>
  );
}

export default Oneday;

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = CategoryLink.map(item => ({
//     params: { genre: String(item.url) }
//   }));
//   return {
//     paths,
//     fallback: true // --> false ??? 1,2,3????????? 404
//   };
// };

export const getServerSideProps: GetServerSideProps = async ctx => {
  await dbConnect();

  const genre = ctx.params?.genre;
  const result = await Promise.resolve(
    Product.find(
      { genre, isvod: { $ne: true }, islive: { $ne: false } },
      { body: false }
    )
      .sort({ firstmeet: 1 })
      .limit(20)
      .lean()
  );

  // console.log("result result result", result);

  return {
    props: {
      SsrData: {
        products: JSON.parse(JSON.stringify(result))
      }
    }
  };
};
