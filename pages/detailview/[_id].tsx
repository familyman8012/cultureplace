import { useDetailView } from "@src/hooks/api/useDetailView";
import { useRouter } from "next/router";
import { GetStaticPaths } from "next";
import { dehydrate, QueryClient } from "react-query";
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

const detailView = ({ item }: IDetail) => {
  const [session] = useSession();
  const router = useRouter();
  const { _id } = router.query;

  return (
    <>
      {item && _id && session && (
        <>
          <DetailViewWrap>
            <Content
              css={
                item?.genre === "이벤트" &&
                css`
                  margin-left: calc(320px + 5%);
                `
              }
            >
              {/* <EditTxt dangerouslySetInnerHTML={{ __html: item?.body }} />
              <InfoMemberChart />
              <ClubDetailInfo item={item} /> */}
              <Review id={String(_id)} session={session} />

              {/* <BannerImg />
              <WePlay />
              <Benefit />
              <Refund title={item.title} />
              <Faq /> */}
            </Content>

            {/* <InfoCard data={item} id={router.asPath.slice(11)} /> */}
          </DetailViewWrap>
        </>
      )}
    </>
  );
};

export default detailView;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true // --> false 시 1,2,3외에는 404
  };
};

export async function getStaticProps(ctx: any) {
  await dbConnect();

  const _id = ctx.params?._id;
  const result = await Product.find(
    { _id },
    { createdAt: false, updatedAt: false }
  ).lean();

  const data = JSON.parse(JSON.stringify(result[0]));

  return {
    props: {
      item: data
    }
  };
}

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
