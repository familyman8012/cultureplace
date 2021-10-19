import axios from "axios";
import { useQuery } from "react-query";

const fetchMainimg = async () => {
  const res = await axios.get("/api/mainvisimg");
  return res.data;
};

const useMainimg = () => {
  return useQuery<any, Error>("mainimgData", () => fetchMainimg());
};

export { useMainimg, fetchMainimg };
