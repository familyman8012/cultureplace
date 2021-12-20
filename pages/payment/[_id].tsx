import PaymentInfo from "@src/components/page/payment/PaymentInfo";
import PaymentComplete from "@src/components/page/payment/PaymentComplete";
import { useProduct } from "@src/hooks/api/useProducts/useProduct";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useState } from "react";

function Payment() {
  const [session] = useSession();

  const router = useRouter();
  const { _id } = router.query;

  const [completeData, setcompleteData] = useState<any>({
    data: { item_name: "", order_id: "", payment_data: "" }
  });
  const [payComplete, setpayComplete] = useState(false);

  const { status, data, error, isLoading, isError } = useProduct(String(_id));

  console.log("dataaa", data);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <>
      {!payComplete ? (
        data && session ? (
          <PaymentInfo
            data={data}
            session={session}
            setcompleteData={setcompleteData}
            setpayComplete={setpayComplete}
          />
        ) : (
          <div>로그인하셔야합니다.</div>
        )
      ) : (
        <PaymentComplete completeData={completeData} />
      )}
    </>
  );
}

export default Payment;
