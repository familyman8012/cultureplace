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
import axios from "axios";
import Search from "@src/components/views/Search";
import { useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { searchStore } from "@src/mobx/store";
interface IQuerykey {
  querykey: string;
  type?: string;
}

export interface ISearchCondition {
  searchInput?: string | undefined;
  filterFind: any | undefined;
}

export default function Infinity({ querykey, type }: IQuerykey) {
  const [searchOption, setSearchOption] = useState<ISearchCondition>({
    searchInput: undefined,
    filterFind: undefined
  });

  const pageNum = useRef(1);

  const { data, error, fetchNextPage, status, refetch, remove } = useInfinity(
    querykey,
    searchOption,
    pageNum
  );

  console.log("data", data);

  const [load, setLoad] = useState(false);
  const queryClient = useQueryClient();
  useEffect(() => {
    setLoad(true);

    // queryClient.resetQueries("list");
    console.log("로드시 searchOption", searchOption);
  }, []);

  // const test = useCallback(() => {
  //   console.log("버튼클릭");
  //   pageNum.current = 1;

  //   setSearchOption({ location: "강남", genre: "영화" });
  // }, [searchOption]);

  useEffect(() => {
    refetch();
    console.log(searchOption);
  }, [searchOption]);

  const searchFind = () => {
    axios
      .get("/api/product/search?search=크리스토퍼놀란의")
      .then(res => console.log("텍스트 검색 결과", res));
  };

  return (
    <Layout type={"listCard"}>
      <React.Fragment>
        <Search
          refetch={refetch}
          pageNum={pageNum}
          setSearchOption={setSearchOption}
        />

        <span onClick={() => searchFind()}>검색버튼</span>
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
              {load && (
                <InView
                  as="div"
                  rootMargin="0px 0px 0px 300px"
                  onChange={() => fetchNextPage()}
                >
                  <span className="loadSelector">test</span>
                </InView>
              )}
            </div>
          </InfinityCardwrap>
        )}
      </React.Fragment>
    </Layout>
  );
}
