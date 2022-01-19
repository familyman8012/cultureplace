import { dehydrate, QueryClient, useQuery } from "react-query";
import { dbConnect, Product, Mainvisimg, Notice } from "../pages/api";
import Layout from "@components/layouts";
import Morebtn from "@components/pageComp/indexpage/Morebtn";
import {
  MainVisual,
  CategoryArea,
  BlogArea,
  NoticeArea,
  CategoryMenu
} from "@components/pageComp/indexpage";
import styled from "@emotion/styled";
import Link from "next/link";
import { CategoryLink } from "@components/layouts/Head";
import { fetchProducts } from "@src/hooks/api/useProducts";
import { GetServerSideProps } from "next";

const Home = ({ SsrData }: any) => {
  const { blogData, noticeData } = SsrData;
  const { data } = useQuery(["list", "main"], () => fetchProducts(90, 1));

  const productsData = data?.products;

  function getGenreData() {
    if (Array.isArray(productsData)) {
      return [
        productsData.filter(el => el.genre === "healing"),
        productsData.filter(el => el.genre === "theater"),
        productsData.filter(el => el.genre === "art"),
        productsData.filter(el => el.genre === "music"),
        productsData.filter(el => el.genre === "food"),
        productsData.filter(el => el.genre === "movie"),
        productsData.filter(el => el.genre === "fashion"),
        productsData.filter(el => el.genre === "wisdom")
      ];
    }
  }

  const genreData = getGenreData();

  const CategoryWrap = styled.div`
    width: 1150px;
    margin: 0 auto;
  `;

  return (
    <Layout>
      <MainVisual />
      <CategoryWrap>
        <CategoryMenu />
        <CategoryArea genreData={genreData} />
        <Morebtn />
        <BlogArea blogData={blogData} />
        <NoticeArea noticeData={noticeData} />
      </CategoryWrap>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await dbConnect();

  const [result, result2, result3] = await Promise.all([
    Notice.find(
      { category: "블로그" },
      { body: false, createdAt: false, updatedAt: false }
    )
      .limit(3)
      .lean(),
    Notice.find(
      { category: "공지사항" },
      { body: false, createdAt: false, updatedAt: false }
    )
      .limit(4)
      .lean(),
    Product.find({}, { body: false }).sort({ firstmeet: 1 }).limit(90).lean()
  ]);

  const SsrData = {
    blogData: JSON.parse(JSON.stringify(result)),
    noticeData: JSON.parse(JSON.stringify(result2)),
    products: JSON.parse(JSON.stringify(result3))
  };

  await queryClient.prefetchQuery(["list", "main"], () => SsrData);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      SsrData
    }
  };
};

export default Home;
