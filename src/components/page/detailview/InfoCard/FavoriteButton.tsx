import { useDetailView } from "@src/hooks/api/useDetailView";
import { IProduct } from "@src/typings/db";
import axios from "axios";
import { useSession } from "next-auth/client";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Favbtn } from "./style";

function FavoriteButton({ data }: { data: IProduct }) {
  const {
    status,
    data: favbtnData,
    error,
    isLoading,
    isError
  } = useDetailView(String(data._id));

  const [session] = useSession();
  console.log(session);

  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(
      favbtnData !== undefined &&
        favbtnData?.favoriteduser.includes(String(session?.user?.uid))
    );
  }, []);

  const variables = {
    _id: data?._id,
    favorite,
    userid: session?.user?.uid
  };
  const queryClient = useQueryClient();
  const favoriteMutation = useMutation(
    () => axios.post("/api/favorite", variables),
    {
      onMutate: async () => {
        await queryClient.cancelQueries(["detailViewData", data?._id]);
        const previousDetail = queryClient.getQueryData<any>([
          "detailViewData",
          data?._id
        ]);
        console.log("previousDetail", previousDetail);
        if (previousDetail) {
          if (!favorite) {
            queryClient.setQueryData<any>(["detailViewData", data?._id], {
              ...previousDetail,
              favoriteduser: [
                ...previousDetail.favoriteduser,
                session?.user.uid
              ]
            });
          } else {
            queryClient.setQueryData<any>(["detailViewData", data?._id], {
              ...previousDetail,
              favoriteduser: previousDetail.favoriteduser.filter(
                (el: any) => el !== session?.user.uid
              )
            });
          }
          setFavorite(data?.favoriteduser.includes(String(session?.user?.uid)));
        }
      },
      // onSuccess: () => queryClient.invalidateQueries("detailViewData"),
      onError: (error, variables, context) => {
        // I will fire first
        console.log(error, variables);
      }
    }
  );
  return (
    <Favbtn favorite={favorite} onClick={() => favoriteMutation.mutate()} />
  );
}

export default FavoriteButton;
