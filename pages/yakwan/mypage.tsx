import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { signOut } from "next-auth/client";
import axios from "axios";
import { WrapPayedInfo } from "../../src/components/page/yakwan/styles";
import { usePayment } from "@src/hooks/api/usePayments";
import Layout from "@src/components/layouts";

function Mypage() {
  const [session] = useSession();
  const router = useRouter();

  const { status, data, error } = usePayment(session?.user.uid);

  console.log(session?.user.uid, data);

  const withdrawal = () => {
    axios
      .delete(`/api/user/user?_id=${session?.user.uid}`)
      .then(function (resp) {
        console.log("resp resp resp113213", resp);

        signOut();
      });

    router.push("/");
  };

  // {
  //   swrdata && console.log(swrdata[0].payments);
  // }

  console.log("session", session);

  return (
    <Layout>
      <WrapPayedInfo>
        {session && (
          <div className="userInfo">
            <div className="name">{session.user.name}</div>
            <div className="email">{session.user.email}</div>
            <div className="withdrawal cursor" onClick={() => withdrawal()}>
              탈퇴
            </div>
          </div>
        )}
        {session && data?.length !== 0 ? (
          <div className="payed_list">
            {data?.map((el, i) => {
              const {
                order_id,
                purchased_at,
                item_name,
                price,
                payment_data,
                method,
                receipt_url
              } = el.data;
              return (
                <div className="item" key={`payinfo${i}`}>
                  <div className="top">
                    <span className="txt_number">{order_id}</span>
                    <span className="txt_pay_date">
                      주문일자 {purchased_at}
                    </span>
                  </div>
                  <div className="box_payment_info">
                    <dl className="box box_counselling">
                      <dt>결제한 상담</dt>
                      <dd className="txt">{item_name}</dd>
                      <dd className="price">{price}원</dd>
                    </dl>
                    <dl className="box box_user">
                      <dt>주문자정보</dt>
                      <dd className="name">{session.user.name}</dd>
                      <dd className="tel">{session.user.phone}</dd>
                      <dd className="email">{session.user.email}</dd>
                    </dl>
                    <dl className="box box_payment_method">
                      <dt>결제정보</dt>
                      <dd className="name">
                        {method === "card" ? payment_data.card_name : method}
                      </dd>
                      <dd className="tel">({payment_data.card_no})</dd>
                    </dl>
                    <div className="box_btns">
                      <a
                        href={receipt_url}
                        className="button cursor"
                        target="_blank"
                        rel="noopner noreferrer"
                      >
                        영수증
                      </a>
                      <span
                        className="button cursor"
                        // onClick={() => ChannelIO("show")}
                      >
                        취소요청
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="payed_list no">구매내역이 없습니다.</div>
        )}
      </WrapPayedInfo>
    </Layout>
  );
}

export default Mypage;
