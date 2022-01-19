import { css } from "@emotion/react";
import Card from "@components/elements/Card";
import { useJoin } from "@src/hooks/api/useMypage";
import Link from "next/link";

function MyJoin({ session }: any) {
  const { data } = useJoin(session?.user.uid);
  return (
    <>
      <h3
        css={css`
          margin-bottom: 10px;
          font-size: 18px;
        `}
      >
        신청한 클래스 <span>({data?.length}개)</span>
      </h3>
      {data?.length === 0 ? (
        <div
          css={css`
            width: 100%;
            margin-top: 30px;
            text-align: center;
            font-weight: normal;
          `}
        >
          신청한 모임이 없습니다.
        </div>
      ) : (
        <div
          css={css`
            display: grid;
            gap: 22px 27px;
            grid-template-columns: 1fr 1fr 1fr;
            .imgbox svg {
              display: none;
            }
          `}
        >
          {data?.map((el, i) => (
            <div key={i}>
              <Link href={`/detailview/${el?._id}`}>
                <a>
                  <Card data={el} />
                </a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default MyJoin;
