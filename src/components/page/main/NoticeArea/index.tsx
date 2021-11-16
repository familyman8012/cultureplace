import { css } from "@emotion/react";
import MainNotice from "@src/components/elements/MainNotice";
import Title from "@src/components/elements/Title";
import { INotice } from "@src/typings/db";
import Link from "next/link";

export interface INoticeData {
  noticeData: INotice[];
}

function index({ noticeData }: INoticeData) {
  return (
    <>
      <Title>트레바리 공지</Title>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        `}
      >
        {noticeData.map(el => {
          return (
            <Link href={`/notice/${el._id}`} key={el._id}>
              <a>
                <MainNotice title={el.title} desc={el.summary} />
              </a>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default index;
