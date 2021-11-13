import { getProviders, getCsrfToken, CtxOrReq } from "next-auth/client";
import SocialLogin from "../src/components/views/SocialLogin";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "@emotion/styled";

export interface ISignIn {
  providers: any;
  csrfToken: any;
}

const LoginWrapper = styled.div`

display: flex;
height: 100vh;
*{ 
font-family: "Noto Sans KR", "Arial", sans-serif ;
line-height:1;
}

.login_area {
  display: flex;
  width:50%;
  flex-direction: column;
  background: #fff;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 18px;
    font-weight: 500;
  }
  h2 {
    margin: 3rem 0;
    font-size:36px;
    font-weight:500;
  }
  .login_form {
    width: 37.6rem;
  }
}
.login_mv {
  width: 50%;
  background: url("/images/login_bg.jpg") no-repeat center top;
  background-size: cover;
}

.box_login_social {
  button {
    display: block;
    width: 100%;
    border-radius: 3px;
    margin-bottom: 8px;
    color: rgb(58, 58, 58);
    line-height: 48px;
    text-align: center;
    font-weight: bold;
    border: 1px solid #aaa;
    .btn_inner {
      padding-left: 3rem;
      margin-left: -3rem;
      font-weight:500;
    }
    &.Kakao {
      border: none;
      background-color: rgb(255, 232, 18) !important;
      .btn_inner {
        background: url("/images/ico_kakao.png")
          no-repeat left center;
        background-size: 2.4rem;
      }
    }
    &.Google {
      background-color: #fff;
      .btn_inner {
        background: url("/images/ico_google.png") no-repeat left center;
        background-size: 2.4rem;
      }
    }
  }
}
.login_form form {
  margin-top: 3rem;
  padding: 1rem 0;
  border-top: 1px solid #ccc;
  .tit {
    font-weight: normal;
    padding: 1rem 0;
  }
  label {
    display: block;
    margin-bottom:15px;
    &:last-child {margin-bottom:10px;}
  }
  input {
    display: block;
    border: 1px solid rgb(215, 215, 215);
    border-radius: 3px;
    appearance: none;
    font-size: 14px;
    font-weight: normal;
    line-height: 20px;
    letter-spacing: -0.15px;
    background-color: white;
    height: 48px;
    width: 100%;
    color: rgb(26, 26, 26);
    box-sizing: border-box;
    padding: 0px 16px;
  }
}




.btn_submit_login {
  display: block;
  background: #ec5990;
  color: white;
  text-transform: uppercase;
  border: none;
  margin-top: 40px;
  padding: 1.5rem;
  font-size: 16px;
  font-weight: bold;
  display: block;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 0.4rem;
  width: 100%;
  font-weight: lighter;
}
}
`;

const InfoRegArea = styled.div`
  display: flex;
  span {
    font-size: 12px;
  }
  .reg {
    margin-left: auto;
  }
`;

const BtnLogin = styled.button`
  display: block;
  width: 100%;
  margin-top: 40px;
  padding: 1.5rem;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 0.4rem;
  background: #ec5990;
  appearance: none;
`;

export default function SignIn({ providers, csrfToken }: ISignIn) {
  const router = useRouter();
  const { error } = router?.query;

  if (typeof window !== "undefined" && error === "CredentialsSignin") {
    alert("아이디와 비밀번호를 확인해주세요.");
  }
  return (
    <>
      <LoginWrapper>
        <div className="login_area">
          <div className="login_form">
            <h1>CULTURE PLACE</h1>
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
                <InfoRegArea>
                  <span className="info forget_pwd">
                    비밀번호를 잊으셨다면, 채널톡으로 문의주세요.
                  </span>
                  <span className="info reg">
                    <Link href="/register">회원가입</Link>
                  </span>
                </InfoRegArea>
                <BtnLogin type="submit">로그인</BtnLogin>
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
      </LoginWrapper>
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context: CtxOrReq | undefined) {
  const providers = await getProviders();
  return {
    props: {
      csrfToken: await getCsrfToken(context),
      providers
    }
  };
}
