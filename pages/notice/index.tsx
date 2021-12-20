import BannerImg from "@src/components/elements/BannerImg";
import BlogCard from "@src/components/elements/BlogCard";
import Layout from "@src/components/layouts";
import {
  SectionNotice,
  TabNotice,
  WrapNotice
} from "@src/components/page/notice/styles";
import { INotice } from "@src/typings/db";
import Link from "next/link";
import { useState } from "react";
import { dehydrate, QueryClient } from "react-query";
import { dbConnect, Notice } from "../../pages/api";

interface INoticeList {
  noticeData: INotice[];
}

function Index({ noticeData }: INoticeList) {
  //불러오기

  const TabNoticeList = [
    "전체보기",
    "공지사항",
    "가이드",
    "블로그",
    "사람들",
    "소식"
  ];

  const [tab, setTab] = useState(0);

  let noticeView = noticeViewFunc(tab);
  function noticeViewFunc(tab: number) {
    if (tab === 0) {
      return noticeData;
    } else {
      return noticeData.filter(el => el.category === TabNoticeList[tab]);
    }
  }

  return (
    <Layout>
      <BannerImg height="300px" bgimg="/images/notice_bannerimg.jpg" />
      <SectionNotice>
        <TabNotice>
          {TabNoticeList.map((txt: string, i: number) => (
            <li
              key={i}
              onClick={() => setTab(i)}
              className={tab === i ? "on" : ""}
            >
              {txt}
            </li>
          ))}
        </TabNotice>
        {noticeView && (
          <WrapNotice>
            {noticeView?.map((el: INotice) => {
              return (
                <Link href={`/notice/${el._id}`} key={el._id}>
                  <a>
                    <BlogCard type="notice" data={el} />
                  </a>
                </Link>
              );
            })}
          </WrapNotice>
        )}
      </SectionNotice>
    </Layout>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await dbConnect();

  const result = await Notice.find().lean();
  const noticeData = JSON.parse(JSON.stringify(result));

  await queryClient.prefetchQuery("noticeData", () => noticeData);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      noticeData
    }
  };
}

export default Index;
