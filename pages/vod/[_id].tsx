import React from "react";
import { useRouter } from "next/router";
import { useVod } from "@src/hooks/api/useVod/useNotice";
import { css } from "@emotion/react";
import VodLeft from "@components/pageComp/vod/VodLeft";
import { useSession } from "next-auth/client";

function Vod() {
  const router = useRouter();
  const { _id } = router.query;
  const [session] = useSession();

  return (
    <>
      {_id && session?.user.uid && (
        <VodLeft _id={_id} sessionId={session?.user.uid} />
      )}
    </>
  );
}

export default Vod;
