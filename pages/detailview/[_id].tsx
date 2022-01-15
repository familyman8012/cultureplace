import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { dbConnect, Product } from "../../pages/api";
import Layout from "@src/components/layouts";
import { IProduct } from "@src/typings/db";
import { css } from "@emotion/react";
import {
  Content,
  DetailViewWrap,
  EditTxt
} from "@src/components/page/detailview/styles";
import {
  BannerImg,
  Benefit,
  ClubDetailInfo,
  Faq,
  Refund,
  WePlay,
  InfoMemberChart,
  InfoCard
} from "@src/components/page/detailview";
import React from "react";
import Modal from "@src/components/elements/Modal";
import Review from "@src/components/page/detailview/Review";
import { useSession } from "next-auth/client";

export interface IDetail {
  item: IProduct;
}

const DetailView = ({ item }: IDetail) => {
  const [session] = useSession();
  const router = useRouter();
  const { _id } = router.query;

  const { data } = useQuery("detail", () => item);

  return (
    <Layout>
      <DetailViewWrap>
        {data && _id !== undefined && (
          <>
            <Content
              css={
                data?.genre === "이벤트" &&
                css`
                  margin-left: calc(320px + 5%);
                `
              }
            >
              <EditTxt dangerouslySetInnerHTML={{ __html: data?.body }} />
              <InfoMemberChart />
              <ClubDetailInfo item={data} />
              <Review item={data} id={String(_id)} />

              <BannerImg />
              <WePlay />
              <Benefit />
              <Refund title={data.title} />
              <Faq />
            </Content>
            <InfoCard data={data} _id={String(_id)} />
          </>
        )}
      </DetailViewWrap>
    </Layout>
  );
};

export default DetailView;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { _id: "61de711076486851207e9bf2" } }],
    fallback: true // --> false 시 1,2,3외에는 404
  };
};

export const getStaticProps: GetStaticProps = async ctx => {
  await dbConnect();

  const _id = ctx.params?._id;
  const result = await Product.find(
    { _id },
    { createdAt: false, updatedAt: false }
  ).lean();

  const data = JSON.parse(JSON.stringify(result[0]));

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("detail", () => data);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      item: data
    }
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [
//       { params: { _id: "1" } },
//       { params: { _id: "2" } },
//       { params: { _id: "3" } },
//       { params: { _id: "4" } },
//       { params: { _id: "5" } }
//     ],
//     fallback: true // --> false 시 1,2,3외에는 404
//   };
// };

// export const getStaticProps: GetStaticProps = async ctx => {

//   await dbConnect();

//   const _id = ctx.params?._id;
//   const res = Product.find({_id}, { createdAt: false, updatedAt: false }).lean();

//   const data = JSON.parse(JSON.stringify(res));

//   return {
//     props: {
//       item: data
//     }
//   };
// };
