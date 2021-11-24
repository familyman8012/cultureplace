import { css } from "@emotion/react";
import MainNotice from "@src/components/elements/MainNotice";
import Title from "@src/components/elements/Title";
import { INotice } from "@src/typings/db";
import dayjs from "dayjs";
import Link from "next/link";
import { NoticeWidth, TitleML, WrapNoticeArea } from "./styles";

export interface INoticeData {
  noticeData: INotice[];
}

function index({ noticeData }: INoticeData) {
  return (
    <WrapNoticeArea>
      <Title css={TitleML}>트레바리 공지</Title>
      <div className="box">
        {noticeData.map(el => {
          console.log(el);
          const { _id, title, summary, updatedAt } = el;
          const upadateDay = dayjs(updatedAt).format("YYYY.MM.DD");
          return (
            <Link href={`/notice/${_id}`} key={_id}>
              <a css={NoticeWidth}>
                <MainNotice
                  title={title}
                  summary={summary}
                  updatedAt={upadateDay}
                />
              </a>
            </Link>
          );
        })}
      </div>
    </WrapNoticeArea>
  );
}

export default index;
