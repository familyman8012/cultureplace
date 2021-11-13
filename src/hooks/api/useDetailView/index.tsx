import axios from "axios";
import { useQuery } from "react-query";

const fetchDetailView = async (_id: string) => {
  if (_id === "undefined") return null;
  const res = await axios.get(`/api/product/${_id}`);
  return res.data[0];
};

const useDetailView = (_id: string) => {
  return useQuery<any | null, Error>(
    ["detailViewData", _id],
    async () => await fetchDetailView(_id)
  );
};

export { useDetailView, fetchDetailView };
