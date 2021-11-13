import BannerImg from "@/../src/components/page/detailview/BannerImg";
import Benefit from "@/../src/components/page/detailview/Benefit";
import ClubDetailInfo from "@/../src/components/page/detailview/ClubDetailInfo";
import Faq from "@/../src/components/page/detailview/Faq";
import Refund from "@/../src/components/page/detailview/Refund";
import WePlay from "@/../src/components/page/detailview/WePlay";
import { useDetailView } from "@/../src/hooks/api/useDetailView";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React from "react";
import InfoMemberChart from "../../src/components/page/detailview/InfoMemberChart";
import InfoCard from "../../src/components/page/detailview/InfoCard";
import { css } from "@emotion/react";
import Layout from "@/../src/components/layouts";

function detailView() {
  const router = useRouter();
  const { _id } = router.query;
  const { status, data, error, isFetching } = useDetailView(String(_id));

  console.log("data", data);

  const DetailViewWrap = styled.div`
    max-width: 1240px;
    margin: 0 auto;
  `;

  const Content = styled.div`
    width: calc(100% - 350px);
    margin-top: 30px;
    &.event {
      margin-left: calc(320px + 5%);
      InfoCard {
        left: 0;
        right: auto;
      }
    }
  `;

  const EditTxt = styled.div`
    * {
      font-size: 18px;
      line-height: 1.8;
    }

    h2 {
      font-size: 28px;
      font-weight: bold;
    }
    li {
      margin-left: 5rem;
      list-style: disc;
    }
    .ql-align-center {
      text-align: center;
    }
    .ql-size-small {
      display: block;
      font-size: 14px;
      line-height: 1.5;
    }
    hr {
      border-top: none;
    }
  `;

  return (
    <Layout>
      <DetailViewWrap>
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
          <ClubDetailInfo />
          <BannerImg />
          <WePlay />
          <Benefit />
          <Refund />
          <Faq />
        </Content>

        {data && <InfoCard data={data} id={_id} />}
      </DetailViewWrap>
    </Layout>
  );
}

export default detailView;
