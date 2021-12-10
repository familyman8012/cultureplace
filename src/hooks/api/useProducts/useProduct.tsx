import { IProduct } from "@src/typings/db";
import axios from "axios";
import { useQuery } from "react-query";

const fetchProduct = async (_id: string) => {
  const res = await axios.get(`/api/product/${_id}`);
  return res.data[0];
};

const useProduct = (_id: string) => {
  return useQuery<IProduct, Error>(
    ["detailViewData", _id],
    async () => await fetchProduct(_id)
  );
};

export { useProduct, fetchProduct };
