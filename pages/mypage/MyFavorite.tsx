import { css } from "@emotion/react";
import Card from "@src/components/elements/Card";
import { useFavorite } from "@src/hooks/api/useMypage";
import Link from "next/link";
import React from "react";

function MyFavorite({ session }: any) {
  const { data } = useFavorite(session?.user.uid);
  console.log(data);
  return (
    <>
      <h3
        css={css`
          margin-bottom: 10px;
          font-size: 18px;
        `}
      >
        찜한 클래스 <span>({data?.length}개)</span>
      </h3>
      <div
        css={css`
          display: grid;
          gap: 22px 27px;
          grid-template-columns: 1fr 1fr 1fr;
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

export default MyFavorite;
