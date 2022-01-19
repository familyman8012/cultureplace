import { css } from "@emotion/react";
import Card from "components/elements/Card";
import Layout from "components/layouts";
import { IProduct } from "@src/typings/db";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";

function Search() {
  const router = useRouter();
  const { keyword } = router.query;

  const [pageSize, setPageSize] = useState(5);
  const [curPage, setCurPage] = useState(1);
  const [searchResult, setsearchResult] = useState<any>({});

  useEffect(() => {
    setCurPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurPage(page);
  }, []);

  useEffect(() => {
    const searchFunc = async () => {
      const searchTxt = await axios.post(
        `/api/product/search?meetingcycle=oneday&page=1`,
        {
          searchInput: keyword
        }
      );
      setsearchResult(searchTxt.data);
    };
    searchFunc();
  }, [keyword]);

  return (
    <Layout>
      <div
        css={css`
          width: 1280px;
          margin: 30px auto;
        `}
      >
        <p>
          연관검색 포함 검색결과 총 {searchResult?.productsCount}가
          검색되었습니다. 이 모임을 원하시나요?
        </p>
        <div
          css={css`
            display: grid;
            margin-top: 30px;
            gap: 22px 27px;
            grid-template-columns: 1fr 1fr 1fr 1fr;
          `}
        >
          {searchResult.products?.map((el: IProduct, i: number) => (
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
          css={css`
            width: fit-content;
            margin: 0 auto;
          `}
          onChange={handlePageChange}
          current={curPage}
          pageSize={pageSize}
          total={searchResult?.productsCount}
        />
      </div>
    </Layout>
  );
}

export default Search;
