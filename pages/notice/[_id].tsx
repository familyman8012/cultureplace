import Button from "@/../src/components/elements/Button";
import Layout from "@/../src/components/layouts";
import { useNotice } from "@src/hooks/api/useNotices/useNotice";
import { LeftOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useMemo } from "react";
import {
  CreateAt,
  NoticeButton,
  NoticeView,
  Title
} from "@src/components/page/notice/styles";

function detailView() {
  const router = useRouter();
  const { _id } = router.query;
  const { status, data, error, isFetching } = useNotice(String(_id));

  const createTime = useMemo(
    () => dayjs(data?.updatedAt).format(`YYYY.MM.DD`),
    []
  );

  console.log(data);

  return (
    <Layout>
      <NoticeView>
        {data && (
          <>
            <div className="top">
              <LeftOutlined /> 목록
            </div>
            <Title>{data?.title}</Title>
            <CreateAt>{createTime}</CreateAt>
            <img src={data?.imgurl} alt={data?.title} />
            <div dangerouslySetInnerHTML={{ __html: String(data?.body) }} />
            <Button color="brand" size="s" css={NoticeButton}>
              목록으로
            </Button>
          </>
        )}
      </NoticeView>
    </Layout>
  );
}

export default detailView;
