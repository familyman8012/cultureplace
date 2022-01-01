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
import styled from "@emotion/styled";
import Link from "next/link";
import { CategoryLink } from "@src/components/layouts/Head";
import { fetchProducts } from "@src/hooks/api/useProducts";

const Home = ({ SsrData }: any) => {
  const { mainVisImgs, blogData, noticeData } = SsrData;

  // ssr 시, useQuery 대신, useProducts 이런 식으로 불러들이면, 제대로 ssr 안됨.
  const { data } = useQuery("indexProducts", () => fetchProducts(90, 1));
  const productsData = data?.products;

  function getGenreData() {
    if (Array.isArray(productsData)) {
      return [
        productsData.filter(el => el.genre === "movie"),
        productsData.filter(el => el.genre === "food"),
        productsData.filter(el => el.genre === "fashion"),
        productsData.filter(el => el.genre === "music"),
        productsData.filter(el => el.genre === "art"),
        productsData.filter(el => el.genre === "theater"),
        productsData.filter(el => el.genre === "impromptu"),
        productsData.filter(el => el.genre === "wisdom"),
        productsData.filter(el => el.genre === "healing")
      ];
    }
  }

  const genreData = getGenreData();

  const CategoryWrap = styled.div`
    width: 1250px;
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
      <MainVisual mainVisImgs={mainVisImgs} />
      <CategoryWrap>
        <div className="categoryLink">
          {CategoryLink.map((el, i) => (
            <Link href={el.url} key={i}>
              <a>{el.title}</a>
            </Link>
          ))}
        </div>
        {genreData && <CategoryArea genreData={genreData} />}
        <Morebtn />
        <BlogArea blogData={blogData} />
        <NoticeArea noticeData={noticeData} />
      </CategoryWrap>
    </Layout>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await dbConnect();

  // const res = await fetch("http://localhost:3000/api/product");

  //const res = await axios.get("http://localhost:3000/api/product");

  //await queryClient.prefetchQuery(["posts"], fetchPosts);
  await queryClient.prefetchQuery("indexProducts", () => fetchProducts(90, 1));

  const [result, result2, result3] = await Promise.all([
    Mainvisimg.find({}, { showNum: false, createdAt: false, updatedAt: false })
      .sort({ createdAt: -1 })
      .lean(),

    Notice.find({ category: "블로그" }, { createdAt: false, updatedAt: false })
      .limit(3)
      .lean(),
    Notice.find({ category: "공지사항" }).limit(4).lean()
  ]);

  const SsrData = {
    mainVisImgs: JSON.parse(JSON.stringify(result)),
    blogData: JSON.parse(JSON.stringify(result2)),
    noticeData: JSON.parse(JSON.stringify(result3))
  };

  // await queryClient.prefetchQuery("posts", () => SsrData.products);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      SsrData
    }
  };
}

export default Home;
