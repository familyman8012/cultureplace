import { useEffect } from "react";
import Link from "next/link";
import { getProviders, getCsrfToken, CtxOrReq } from "next-auth/client";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { SignInSeo } from "@components/elements/CommonSeo";
import SocialLogin from "../components/modules/SocialLogin";
import MobMenu from "@components/layouts/MobMenu";
import {
  BtnLogin,
  InfoRegArea,
  LoginWrapper
} from "@components/pageComp/signin/style";

export interface ISignIn {
  providers: object;
  csrfToken?: string;
}

export default function SignIn() {
  const router = useRouter();
  const { error } = router?.query;

  const { data: providers, isLoading: isProvidersLoading } = useQuery(
    "providers",
    () => getProviders()
  );

  const { data: csrfToken, isLoading: isCsrfTokenLoading } = useQuery(
    "csrfToken",
    () => getCsrfToken()
  );

  useEffect(() => {
    if (typeof window !== "undefined" && error === "CredentialsSignin") {
      alert("아이디와 비밀번호를 확인해주세요.");
    }
  }, [error]);

  if (isProvidersLoading || isCsrfTokenLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SignInSeo />
      <LoginWrapper>
        <div className="login_area">
          <div className="login_form">
            <h1>CULTURE PLACE</h1>
            <h2>로그인</h2>
            <div>
              {providers && csrfToken && (
                <SocialLogin providers={providers} csrfToken={csrfToken} />
              )}

              <form method="post" action="/api/auth/callback/credentials">
                {csrfToken && (
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />
                )}
                <label>
                  <div className="tit">이메일</div>
                  <div>
                    <input
                      name="email"
                      type="text"
                      placeholder="example@example.com"
                    />
                  </div>
                </label>
                <label>
                  <div className="tit">비밀번호</div>
                  <div>
                    <input
                      name="userpwd"
                      type="password"
                      placeholder="********"
                    />
                  </div>
                </label>
                <InfoRegArea>
                  <Link href="/findaccount">
                    <a className="info forget_pwd">ID, 비밀번호 찾기</a>
                  </Link>
                  <span className="info reg">
                    <Link href="/register">회원가입</Link>
                  </span>
                </InfoRegArea>
                <BtnLogin type="submit">로그인</BtnLogin>
                <div className="txt_read_yakawn">
                  <Link href="/yakwan/privacy">
                    <a>이용약관</a>
                  </Link>
                  ,{" "}
                  <Link href="/yakwan/policy">
                    <a>개인정보 수집 및 이용</a>
                  </Link>
                  , 내용을 확인하였고 동의합니다.
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="login_mv"></div>
      </LoginWrapper>
      <MobMenu />
    </>
  );
}
