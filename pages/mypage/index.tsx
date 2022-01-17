import React from "react";
import { useSession } from "next-auth/client";
import { useFavorite } from "@src/hooks/api/useMypage";
import MyFavorite from "./MyFavorite";
import MyJoin from "./MyJoin";
import Layout from "@src/components/layouts";
import { css } from "@emotion/react";
import Link from "next/link";

function Index() {
  const [session] = useSession();
  console.log("session session session", session);
  return (
    <Layout>
      <div
        css={css`
          display: flex;
          width: 1000px;
          margin: 72px auto;
          .wrap_menu {
            li {
              margin-top: 15px;
            }
            min-width: 200px;
            margin-right: 78px;
            .userName {
              font-size: 30px;
              line-height: 40px;
              font-weight: 700;
            }
            .email {
              color: rgb(162, 162, 162);
              display: flex;
              -webkit-box-align: center;
              align-items: center;
              font-size: 14px;
              font-weight: normal;
              line-height: 20px;
              letter-spacing: -0.15px;
              margin: 0px;

              margin-bottom: 40px;
            }
          }
          .wrap_cont {
            font-size: 18px;
            font-weight: bold;
            color: rgb(26, 26, 26);
            line-height: 24px;
            letter-spacing: -0.45px;
            margin: 0px;
            padding-top: 15px;
          }
        `}
      >
        <div className="wrap_menu">
          <div className="profile">
            <div className="userName">{session?.user.name}</div>
            <div className="email">{session?.user.email}</div>
          </div>
          <h2>내 정보</h2>
          <ul>
            <li>
              <Link href="/mypage/payment">주문내역</Link>
            </li>
          </ul>
        </div>
        <div className="wrap_cont">
          <div
            css={css`
              margin-bottom: 100px;
            `}
          >
            {session && <MyJoin session={session} />}
          </div>
          <div>{session && <MyFavorite session={session} />}</div>
        </div>
      </div>
    </Layout>
  );
}

export default Index;
