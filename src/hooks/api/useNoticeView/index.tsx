import axios from "axios";
import { useQuery } from "react-query";

const fetchNoticeView = async (_id: string) => {
  if (_id === "undefined") return null;
  const res = await axios.get(`/api/notice/${_id}`);
  return res.data[0];
};

const useNoticeView = (_id: string) => {
  return useQuery<any | null, Error>(["noticeViewData", _id], () =>
    fetchNoticeView(_id)
  );
};

export { useNoticeView, fetchNoticeView };
