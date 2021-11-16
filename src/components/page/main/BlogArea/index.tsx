import { css } from "@emotion/react";
import BlogCard from "@src/components/elements/BlogCard";
import Title from "@src/components/elements/Title";
import { INotice } from "@src/typings/db";
import Link from "next/link";

export interface IBlogData {
  blogData: INotice[];
}
function index({ blogData }: IBlogData) {
  return (
    <>
      <Title>블로그</Title>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        {blogData?.map(el => (
          <Link href={`/notice/${el._id}`} key={el._id}>
            <a>
              <BlogCard type="blog" data={el} />
            </a>
          </Link>
        ))}
      </div>
    </>
  );
}

export default index;
