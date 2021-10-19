import React, { useCallback } from "react";
import AdminLayout from "../../../src/components/layouts/Admin/layout";

import { useMutation, useQueryClient } from "react-query";
import { useMainimg } from "@/../src/hooks/api/useMainimg";
import Link from "next/link";
import axios from "axios";

function Mainvis() {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = useMainimg();

  const delteImgMutation = useMutation(
    (_id: string) =>
      axios.delete(`/api/mainvisimg/${_id}`).then((res) => {
        return res.data;
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("mainimgData"),
      onError: (error, variables, context) => {
        // I will fire first
        console.log(error, variables);
      },
    }
  );

  console.log(data);
  return (
    <AdminLayout>
      <div>
        {status === "loading" ? (
          "Loading..."
        ) : status === "error" ? (
          <span>Error: {error?.message}</span>
        ) : (
          <>
            {data.map((img: any) => (
              <div>
                <img src={img.pclocation} alt="" height="100" />
                <img src={img.molocation} alt="" height="100" />
                <span onClick={() => delteImgMutation.mutate(img._id)}>
                  삭제
                </span>
              </div>
            ))}
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}
      </div>
      <Link href="/admin/mainvis/upload">
        <a>메인비쥬얼 이미지 업로드</a>
      </Link>
    </AdminLayout>
  );
}

export default Mainvis;
