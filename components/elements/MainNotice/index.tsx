import { NoticeBox } from "./styles";
import { INotice } from "@src/typings/db";

export interface IMainNotice {
  title: string;
  summary: string;
  updatedAt: string;
}

function MainNotice({ title, summary, updatedAt }: IMainNotice) {
  return (
    <NoticeBox>
      <dt>{title}</dt>
      <dd className="desc">{summary}</dd>
      <dd className="writtenDate">{updatedAt}</dd>
    </NoticeBox>
  );
}

export default MainNotice;
