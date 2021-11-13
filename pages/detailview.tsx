import React from "react";
import SimpleStatics from "../src/components/page/detailview/InfoMemberChart";
import ClubDetailInfo from "../src/components/page/detailview/ClubDetailInfo";
import BannerImg from "../src/components/page/detailview/BannerImg";
import WePlay from "../src/components/page/detailview/WePlay";
import Benefit from "../src/components/page/detailview/Benefit";
import Refund from "../src/components/page/detailview/Refund";
import Faq from "../src/components/page/detailview/Faq";
import SideInfo from "../src/components/page/detailview/SideInfo";
import { useDetailView } from "../src/hooks/api/useDetailView";

function detailview() {
  return (
    <>
      <SimpleStatics />
      <ClubDetailInfo />
      <BannerImg />
      <WePlay />
      <Benefit />
      <Refund />
      <Faq />
      <SideInfo />
    </>
  );
}

export default detailview;
