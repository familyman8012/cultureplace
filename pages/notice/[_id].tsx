import Button from "@/../src/components/elements/Button";
import Layout from "@/../src/components/layouts";
import { useNoticeView } from "@/../src/hooks/api/useNoticeView";
import { LeftOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

function detailView() {
  const router = useRouter();
  const { _id } = router.query;
  const { status, data, error, isFetching } = useNoticeView(String(_id));

  const NoticeView = styled.div`
    width: 840px;
    margin: 0 auto;
    .top {
      display: flex;
      align-items: center;
      color: ${({ theme }) => theme.color.brand};
      .anticon-left {
        font-size: 10px;
        margin-right: 15px;
      }
    }
    h2 {
      font-size: 26px;
    }
    h3 {
      margin-bottom: 8px;
    }
    img {
      display: block;
      margin: 32px 0;
    }
  `;

  const Title = styled.div`
    font-size: 25px;
    font-weight: bold;
    margin: 26px;
    text-align: center;
  `;

  const CreateAt = styled.div`
    font-size: 14px;
    color: rgb(123, 123, 123);
    text-align: center;
  `;

  const createTime = useMemo(
    () => dayjs(data?.updatedAt).format(`YYYY.MM.DD`),
    []
  );

  console.log(data);

  return (
    <Layout>
      <NoticeView>
        <div className="top">
          <LeftOutlined /> 목록
        </div>
        <Title>{data?.title}</Title>
        <CreateAt>{createTime}</CreateAt>
        <img src={data?.imgurl} alt={data?.title} />
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: data?.body }}
        />
        <Button
          color="brand"
          size="s"
          css={css`
            display: block;
            margin: 100px auto;
            height: 46px;
            border-radius: 28px;
          `}
        >
          목록으로
        </Button>
      </NoticeView>
    </Layout>
  );
}

export default detailView;
