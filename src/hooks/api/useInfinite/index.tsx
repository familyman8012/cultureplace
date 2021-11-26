import { Iinfinity } from "@src/typings/db";
import axios from "axios";
import { useRef } from "react";
import { useInfiniteQuery } from "react-query";

const fetchPosts = async (querykey: string, pageParam: number) => {
  let url;
  switch (querykey) {
    case "oneday":
      url = `/api/product?meetingcycle=1day&limit=12&page=${pageParam}`;
      break;
    case "month":
      url = `/api/product?meetingcycle=1month&limit=8&page=${pageParam}`;
      break;
    default:
      break;
  }
  const res = await axios.get(`${url !== undefined && url}`);
  return res.data;
};

const useInfinity = (querykey: string) => {
  const pageNum = useRef(1);
  return useInfiniteQuery(
    ["list", querykey],
    async ({ pageParam = pageNum.current }) => {
      const res = await fetchPosts(querykey, pageParam);
      pageNum.current = pageNum.current + 1;
      return res;
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage: Iinfinity) => {
        console.log(
          "pageNum.current",
          pageNum.current,
          "lastPage.hasNextPage",
          lastPage.hasNextPage
        );

        if (lastPage.hasNextPage) {
          return pageNum.current;
        }

        return undefined;
      },
      staleTime: 3000
    }
  );
};

export { fetchPosts, useInfinity };
