import axios from "axios";
import { useQuery } from "react-query";

const fetchNotices = async () => {
  const res = await axios.get("/api/notice");
  return res.data;
};

const useNotices = () => {
  return useQuery<any, Error>("noticeData", () => fetchNotices());
};

export { useNotices, fetchNotices };
