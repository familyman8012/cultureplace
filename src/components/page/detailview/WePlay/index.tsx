import React from "react";
import styled from "@emotion/styled";
import Title from "../Title";
import SectionWrap from "../SectionWrap";

const PlayList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Play = styled.dl<{ bgimg: string }>`
  width: 45%;
  margin-bottom: 30px;
  padding-top: 78px;
  background: url(${({ bgimg }: any) => bgimg}) no-repeat left top;
  background-size: auto 57.5px;
  dt {
    font-size: 16px;
    color: ${({ theme }) => theme.color.brand};
    line-height: 24px;
  }
  .desc {
    font-size: 15px;
  }
  .subdesc {
    font-size: 13px;
    color: ${({ theme }) => theme.color.gray};
  }
`;

const memberTxtList = [
  {
    id: "play1",
    title: "읽고,",
    desc: "한 달에 한 권, 선정된 책을 함께 읽어요.",
    subDesc: ""
  },
  {
    id: "play2",
    title: "쓰고,",
    desc: "모임 이틀 전까지 독후감을 써요. 독후감을 써야 모임에 참석할 수 있답니다!",
    subDesc: "걱정 뚝! 내 생각을 정리하다 보면 400자는 금방이에요."
  },
  {
    id: "play3",
    title: "대화하고,",
    desc: "모임 날엔 아지트에 함께 모여, 읽은 책과 독후감에 대해 이야기해요.",
    subDesc: "진행을 돕는 파트너와 발제문이 있으니 몸만 오세요."
  },
  {
    id: "play4",
    title: "친해져요.",
    desc: "뜻을 모아 뒤풀이와 번개가 열려요.",
    subDesc:
      "꿀팁! 멤버라면 아지트 공간을 무료로 대관할 수 있으니 활용해보세요."
  }
];

function index() {
  return (
    <SectionWrap>
      <Title>트레바리 클럽의 멤버가 되면? 👀</Title>
      <PlayList>
        {memberTxtList.map((item, i) => (
          <Play key={item.id} id={item.id} bgimg={`/images/weplay${i + 1}.png`}>
            <dt>{item.title}</dt>
            <dd className="desc">{item.desc}</dd>
            <dd className="subdesc">{item.subDesc}</dd>
          </Play>
        ))}
      </PlayList>
    </SectionWrap>
  );
}

export default index;
