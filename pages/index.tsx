import { dehydrate, QueryClient, useQuery } from "react-query";
import { dbConnect, Product, Mainvisimg, Notice } from "../pages/api";
import Layout from "@src/components/layouts";
import Morebtn from "@src/components/page/main/Morebtn";
import {
  MainVisual,
  CategoryArea,
  BlogArea,
  NoticeArea
} from "@src/components/page/main";
import { ISSR } from "@src/typings/db";

const Home = ({ SsrData }: ISSR) => {
  const { mainVisImgs, blogData, noticeData } = SsrData;
  const { data: productsData } = useQuery("posts", () => SsrData.products);

  function getGenreData() {
    if (Array.isArray(productsData)) {
      return [
        productsData.filter(el => el.todo === "직접하기"),
        productsData.filter(el => el.genre === "음악"),
        productsData.filter(el => el.genre === "서울걷기"),
        productsData.filter(el => el.genre === "소극장"),
        productsData.filter(el => el.genre === "영화"),
        productsData.filter(el => el.genre === "성장하기")
      ];
    }
  }

  const genreData = getGenreData();

  return (
    <Layout>
      <MainVisual mainVisImgs={mainVisImgs} />
      <div style={{ width: "1250px", margin: "0 auto" }}>
        {genreData && <CategoryArea genreData={genreData} />}
        <Morebtn />
        <BlogArea blogData={blogData} />
        <NoticeArea noticeData={noticeData} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await dbConnect();

  const [result, result2, result3, result4] = await Promise.all([
    Mainvisimg.find(
      {},
      { showNum: false, createdAt: false, updatedAt: false }
    ).lean(),
    Product.find({}, { createdAt: false, updatedAt: false }).lean(),
    Notice.find({ category: "블로그" }, { createdAt: false, updatedAt: false })
      .limit(3)
      .lean(),
    Notice.find({ category: "공지사항" }).limit(4).lean()
  ]);

  const SsrData = {
    mainVisImgs: JSON.parse(JSON.stringify(result)),
    products: JSON.parse(JSON.stringify(result2)),
    blogData: JSON.parse(JSON.stringify(result3)),
    noticeData: JSON.parse(JSON.stringify(result4))
  };

  await queryClient.prefetchQuery("posts", () => SsrData.products);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      SsrData
    }
  };
}

export default Home;
