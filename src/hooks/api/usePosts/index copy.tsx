import ky from "ky-universal";
import { useQuery } from "react-query";

const fetchPosts = async () => {
  const result: any = await ky("/api/product").json();
  return result;
};

const usePosts = () => {
  return useQuery("posts", () => fetchPosts());
};

export { usePosts, fetchPosts };
