import { css } from "@emotion/react";
import styled from "@emotion/styled";
import BlogCard from "@src/components/elements/BlogCard";
import Title from "@src/components/elements/Title";
import { INotice } from "@src/typings/db";
import Link from "next/link";

export interface IBlogData {
  blogData: INotice[];
}

const NoticeTitle = css`
  margin: 12rem 0 3.6rem;
`;

const WrapBlogArea = styled.div`
  .cont {
    display: flex;
    justify-content: space-between;
  }

  .blogwidth {
    width: 31%;
  }

  Title {
    margin: 12rem 0 3.6rem;
  }
`;

function index({ blogData }: IBlogData) {
  return (
    <WrapBlogArea>
      <Title css={NoticeTitle} url="/notice">
        블로그
      </Title>
      <div className="cont">
        {blogData?.map(el => (
          <Link href={`/notice/${el._id}`} key={el._id}>
            <a className="blogwidth">
              <BlogCard type="blog" data={el} />
            </a>
          </Link>
        ))}
      </div>
    </WrapBlogArea>
  );
}

export default index;
