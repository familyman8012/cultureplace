import { useQuery } from "react-query";
import axios from "axios";
import { IProduct } from "@src/typings/db";

const fetchProducts = async () => {
  const res = await axios.get("/api/product");
  return res.data;
};

const useProducts = () => {
  return useQuery<IProduct[], Error>("productData", () => fetchProducts());
};

export { useProducts, fetchProducts };
