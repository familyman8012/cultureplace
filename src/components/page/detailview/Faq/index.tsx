import React from "react";
import Title from "../Title";
import styled from "@emotion/styled";
import Accordion from "../../../views/Accordion";
import Link from "next/link";
import SectionWrap from "../SectionWrap";

function index() {
  const faqList = [
    {
      title: "1. 트레바리 멤버가 되면 어떤 혜택이 있나요?",
      text: (
        <p>
          <strong>독서모임</strong> 월 1회, 총 4번의 트레바리 독서모임에
          참여하게 됩니다. (일부 6회)
          <br />
          <strong>이벤트</strong> 강연부터 체험까지 지적이고 사랑스러운 이벤트에
          참여하실 수 있어요.
          <br />
          <strong>아지트</strong> 트레바리 멤버가 모여 읽고, 쓰고, 대화하고 놀
          수 있는 공간이 제공돼요.
          <br />
          <Link href="/">
            <a target="_blank" style={{ fontSize: "14px" }}>
              &gt; 자세하게 보기
            </a>
          </Link>
        </p>
      )
    },
    {
      title: "2. 독후감을 제출하지 않으면 정말 모임에 참가할 수 없나요?",
      text: (
        <p>
          안타깝지만 그렇습니다!
          <br />
          트레바리는 참가자 모두 책을 읽고 각자의 생각을 정리한 후 양질의 대화가
          이루어진다고 믿습니다. 저희를 믿고 등록을 해주신 멤버 여러분들에게
          &apos;지속 가능한 독서모임 서비스&apos;를 제공하기 위해서라도, 저희는
          최선을 다해 원칙을 지켜나가려고 합니다.
          <br />
          예쁘게 봐주세요!
        </p>
      )
    },
    {
      title: "3. 모임 진행 순서는 어떻게 되나요?",
      text: (
        <p>
          <strong>책 읽기</strong> 선정된 책을 구매해서 읽어주세요.
          <br />
          <strong>단톡방</strong> 시즌 시작 후, 순차적으로 단톡방을 개설하여
          초대해드립니다.
          <br />
          <strong>독후감</strong> 쓰기 모임 이틀 전까지 독후감을 제출해주세요!
          (트레바리 홈페이지&gt; 마이페이지)
          <br />
          <strong>모임참석</strong> 상세페이지에 안내된 첫 모임, 장소에서 정해진
          발제문으로 대화를 나누어요.
          <br />
          <strong>뒷풀이&amp;번개</strong> 모임 이후 함께 뒷풀이를 가거나, 한
          달에 한 번 번개에 참여해요.
        </p>
      )
    },
    {
      title: "4. 어떤 이야기를 나누나요?",
      text: (
        <p>
          트레바리에서 우린 어떤 대화를 나누게 될까요?
          <br />
          우리는 서로 가진 지식과 의견을 꺼내어 생각을 발전시킬 수 있는 주제,
          또는 서로 의견이 달라 논쟁할 수 있는 주제로 이야기를 나누게 될 거예요.
          <br />
          어떤 &apos;발제&apos;로 어떤 &apos;토론&apos;을 하는지 살짝
          보여드릴게요
        </p>
      )
    }
  ];
  return (
    <SectionWrap>
      <Title>FAQ</Title>
      {/* <Accordion textList={faqList} /> */}
    </SectionWrap>
  );
}

export default index;
