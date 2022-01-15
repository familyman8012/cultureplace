import { css } from "@emotion/react";
import Card from "@src/components/elements/Card";
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
      <div
        css={css`
          display: grid;
          gap: 22px 27px;
          grid-template-columns: 1fr 1fr;
          .imgbox div {
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
    </>
  );
}

export default MyJoin;
