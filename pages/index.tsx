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
import styled from "@emotion/styled";

const Home = ({ SsrData }: ISSR) => {
  const { mainVisImgs, blogData, noticeData } = SsrData;
  const { data: productsData } = useQuery("posts", () => SsrData.products);

  function getGenreData() {
    if (Array.isArray(productsData)) {
      return [
        productsData.filter(el => el.genre === "영화"),
        productsData.filter(el => el.genre === "미식"),
        productsData.filter(el => el.genre === "패션"),
        productsData.filter(el => el.genre === "뮤직"),
        productsData.filter(el => el.genre === "미술"),
        productsData.filter(el => el.genre === "공연"),
        productsData.filter(el => el.genre === "번개"),
        productsData.filter(el => el.genre === "지식"),
        productsData.filter(el => el.genre === "힐링산책")
      ];
    }
  }

  const genreData = getGenreData();

  const CategoryWrap = styled.div`
    width: 1148px;
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

  const CategoryLink = [
    { title: "영화", url: "" },
    { title: "음식", url: "" },
    { title: "패션", url: "" },
    { title: "뮤직", url: "" },
    { title: "미술", url: "" },
    { title: "공연", url: "" },
    { title: "번개", url: "" },
    { title: "지식", url: "" },
    { title: "힐링산책", url: "" },
    { title: "직접해보기", url: "" }
  ];

  return (
    <Layout>
      <MainVisual mainVisImgs={mainVisImgs} />
      <CategoryWrap>
        <div className="categoryLink">
          {CategoryLink.map((el, i) => (
            <a key={i}>{el.title}</a>
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
