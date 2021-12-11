import { Iinfinity } from "@src/typings/db";
import axios from "axios";
import { MutableRefObject, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import _ from "lodash";

const fetchPosts = async (
  querykey: string,
  pageParam: number,
  searchOption: any
) => {
  let url;
  const { searchInput, filterFind } = searchOption;
  // console.log("searchOption, searchOption", filterFind);

  // const searchOptionResult = _.pickBy(searchOption, (value, key) => {
  //   return !_.isEmpty(value);
  // });
  // let queryString = Object.entries(searchOptionResult)
  //   .map(p => encodeURIComponent(p[0]) + "=" + encodeURIComponent(p[1]))
  //   .join("&");
  // console.log("queryString", queryString);

  let res;
  if (searchInput || filterFind) {
    res = await axios.post(
      `/api/product/search?meetingcycle=1day&limit=12&page=${pageParam}`,
      searchOption
    );
    return res.data;
  }

  switch (querykey) {
    case "oneday":
      url = `/api/product?meetingcycle=1day&limit=12&page=${pageParam}`;
      break;
    case "month":
      url = `/api/product?meetingcycle=1month&limit=8&page=${pageParam}`;
      break;
    case "event":
      url = `/api/product?genre=이벤트&limit=8&page=${pageParam}`;
      break;
    case "music":
      url = `/api/product?genre=음악&limit=8&page=${pageParam}`;
      break;
    case "travel":
      url = `/api/product?genre=서울걷기&limit=8&page=${pageParam}`;
      break;
    case "theater":
      url = `/api/product?genre=소극장&limit=8&page=${pageParam}`;
      break;
    case "movie":
      url = `/api/product?genre=영화&limit=8&page=${pageParam}`;
      break;
    case "njob":
      url = `/api/product?genre=성장하기&limit=8&page=${pageParam}`;
      break;
    default:
      break;
  }
  console.log(url);
  res = await axios.get(`${url !== undefined && url}`);
  return res.data;
};

const useInfinity = (
  querykey: string,
  searcOption: any,
  pageNum = useRef(1)
) => {
  pageNum;
  return useInfiniteQuery(
    ["list", querykey],
    async ({ pageParam = pageNum.current }) => {
      // console.log("searcOption useInfinity", searcOption);
      const res = await fetchPosts(querykey, pageParam, searcOption);

      pageNum.current = pageNum.current + 1;
      return res;
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage: Iinfinity) => {
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
