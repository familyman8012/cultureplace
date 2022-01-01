import { useQuery } from "react-query";
import axios from "axios";
import { IProductList } from "@src/typings/db";

const fetchProducts = async (
  limit: number,
  pageParam: number,
  genre?: string
) => {
  console.log("pageParam", pageParam);
  const parse = await axios.get(
    `http://localhost:3000/api/product?limit=${limit}&page=${pageParam}${
      genre ? `&genre=${genre}` : ``
    }`
  );
  const result: IProductList = parse.data;
  return result;
};

const useProducts = (limit: number, pageParam: number, genre?: string) => {
  return useQuery<IProductList, Error>(
    ["products", genre, pageParam],
    () => fetchProducts(limit, pageParam, genre),
    {
      keepPreviousData: true
    }
  );
};

export { useProducts, fetchProducts };
