import { IProduct } from "@src/typings/db";
import axios from "axios";
import { useQuery } from "react-query";

const fetchDetailView = async (_id: string) => {
  const res = await axios.get(`/api/product/${_id}`);
  return res.data[0];
};

const useDetailView = (_id: string) => {
  return useQuery<IProduct | null, Error>(
    ["detailViewData", _id],
    async () => await fetchDetailView(_id)
  );
};

export { useDetailView, fetchDetailView };
