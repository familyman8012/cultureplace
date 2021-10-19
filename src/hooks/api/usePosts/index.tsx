import ky from "ky-universal";
import { useQuery } from "react-query";

const fetchPosts = async (products: any) => {
  const result: any = products;
  return result;
};

// const usePosts = () => {
//   return useQuery("posts", () => fetchPosts());
// };

export { fetchPosts };
