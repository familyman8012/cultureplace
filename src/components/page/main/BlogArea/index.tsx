import { css } from "@emotion/react";
import BlogCard from "@src/components/elements/BlogCard";
import Title from "@src/components/elements/Title";
import { INotice } from "@src/typings/db";
import Link from "next/link";
import { WrapBlogArea } from "./styles";

export interface IBlogData {
  blogData: INotice[];
}

const NoticeTitle = css`
  margin: 12rem 0 3.6rem;
`;

const BlogWidth = css`
  width: 31%;
`;

function index({ blogData }: IBlogData) {
  return (
    <>
      <Title css={NoticeTitle}>블로그</Title>
      <WrapBlogArea>
        {blogData?.map(el => (
          <Link href={`/notice/${el._id}`} key={el._id}>
            <a css={BlogWidth}>
              <BlogCard type="blog" data={el} />
            </a>
          </Link>
        ))}
      </WrapBlogArea>
    </>
  );
}

export default index;
