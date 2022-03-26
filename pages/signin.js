import { getProviders, getCsrfToken } from "next-auth/client";
import SocialLogin from "components/elements/SocialLogin";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SignIn({ providers, csrfToken }) {
  const router = useRouter();
  const { error } = router?.query;

  if (typeof window !== "undefined" && error === "CredentialsSignin") {
    alert("아이디와 비밀번호를 확인해주세요.");
  }
  return (
    <>
      <div className="login_wrapper">
        <div className="login_area">
          <div className="login_form">
            <h1>MINDCARE CENTER</h1>
            <h2>로그인</h2>
            <div>
              <SocialLogin providers={providers} csrfToken={csrfToken} />
              <form method="post" action="/api/auth/callback/credentials">
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />
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
                <div className="info_reg">
                  <span className="info forget_pwd">
                    비밀번호를 잊으셨다면, 채널톡으로 문의주세요.
                  </span>
                  <span className="info reg">
                    <Link href="/register">회원가입</Link>
                  </span>
                </div>
                <button type="submit" className="btn_submit_login">
                  로그인
                </button>
                <div className="txt_read_yakawn">
                  <Link href="/yakwan">
                    <a>이용약관</a>
                  </Link>
                  ,{" "}
                  <Link href="/policy2">
                    <a>개인정보 수집 및 이용</a>
                  </Link>
                  , 내용을 확인하였고 동의합니다.
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="login_mv"></div>
      </div>
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: {
      csrfToken: await getCsrfToken(context),
      providers
    }
  };
}
