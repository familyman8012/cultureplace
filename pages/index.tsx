import { dehydrate, QueryClient, useQuery } from "react-query";
import { dbConnect, Product, Mainvisimg, Notice } from "../pages/api";
import Layout from "components/layouts";
import Morebtn from "components/pageComp/indexpage/Morebtn";
import {
  MainVisual,
  CategoryArea,
  BlogArea,
  NoticeArea
} from "components/pageComp/indexpage";
import styled from "@emotion/styled";
import Link from "next/link";
import { CategoryLink } from "components/layouts/Head";
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
    .categoryLink {
      margin-bottom: -30px;
      padding: 40px 15px;
      text-align: center;
      overflow: auto;
      white-space: nowrap;
      -ms-overflow-style: none;
      a {
        margin-left: 16px;
        padding: 6px 16px;
        font-size: 14px;
        color: #4c57fd;
        border-radius: 17px;
        box-shadow: 0 2px 8px 0 rgb(0 0 0 / 12%);
        background-color: #ffffff;
        cursor: pointer;
        &:hover,
        &:focus {
          text-decoration: none;
          box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);
        }
        &:nth-of-type(n) {
          color: #4c57fd;
          &:hover,
          &:focus {
            color: #3d46ca;
          }
        }
        &:nth-of-type(2n) {
          color: #6053f8;
          &:hover,
          &:focus {
            color: #4d42c6;
          }
        }
        &:nth-of-type(3n) {
          color: #744ff3;
          &:hover,
          &:focus {
            color: #5d3fc2;
          }
        }
        &:nth-of-type(4n) {
          color: #884bee;
          &:hover,
          &:focus {
            color: #6d3cbe;
          }
        }
        &:nth-of-type(5n) {
          color: #9d45e8;
          &:hover,
          &:focus {
            color: #7e37ba;
          }
        }
      }
    }
  `;

  return (
    <Layout>
      <MainVisual />
      <CategoryWrap>
        <div className="categoryLink">
          {CategoryLink.map((el, i) => (
            <Link href={`/view/${el.url}`} key={i}>
              <a>{el.title}</a>
            </Link>
          ))}
        </div>
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
