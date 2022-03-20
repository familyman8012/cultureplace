import { INotice } from "@src/typings/db";
import axios from "axios";
import { useQuery } from "react-query";

const fetchCurriculum = async (_id: string) => {
  const res: { data: any } = await axios.get(`/api/curriculum/${_id}`);
  console.log("fetchLesson res", res);
  return res.data[0];
};
const useVod = (_id: string) => {
  return useQuery(["curriculum"], () => fetchCurriculum(_id));
};

export { useVod, fetchCurriculum };
