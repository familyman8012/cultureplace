/** @jsxImportSource @emotion/react */
import React, { useCallback } from "react";
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react";
import { prodUpStore } from "@/../src/mobx/store";
import { runInAction } from "mobx";
import { useRouter } from "next/router";
import AdminLayout from "../../../src/components/layouts/Admin/layout";

import { Image } from "antd";
import useImgUp from "@/../src/hooks/useImgUp";
import { ProductUploadForm } from "./styles";

function App() {
  // 라우터
  const router = useRouter();

  //리액트 hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: prodUpStore.data });

  //이미지 업로드 훅
  const [imgData, setImgData, onImgUpHadler] = useImgUp("cardoriginal");

  const onSubmit = useCallback(
    (data) => {
      console.log(data);
      if (imgData === undefined && prodUpStore.data === null) {
        return alert("대표 이미지를 등록하셔야 합니다.");
      }

      const productData = {
        ...data,
        imgurl: `${imgData !== undefined ? imgData : prodUpStore.data.imgurl}`,
      };
      runInAction(() => {
        prodUpStore.addProduct(productData);
      });
      router.push("/admin/product/detail");
    },
    [imgData]
  );

  return (
    <AdminLayout>
      <div
        css={css`
          ${ProductUploadForm};
        `}
      >
        <div>
          <span>
            {imgData !== undefined ? (
              <Image
                width={255}
                height={170}
                src={imgData}
                alt="모임대표이미지 등록"
              />
            ) : prodUpStore.data !== null ? (
              <Image
                width={255}
                height={170}
                src={prodUpStore.data.imgurl}
                alt="모임대표이미지 등록"
              />
            ) : null}
          </span>
          <input
            type="file"
            id="upload"
            className="image-upload"
            onChange={onImgUpHadler}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>모임명</label>
          <input
            type="text"
            placeholder="제목"
            {...register("title", { required: true, maxLength: 80 })}
          />
          {errors.title && <span>This field is required</span>}
          <label>설명</label>
          <input
            type="text"
            placeholder="ex)가을에 와인한잔에 로맨스 영화 한편"
            {...register("desc", { required: true, maxLength: 80 })}
          />
          {errors.desc && <span>This field is required</span>}
          <label>대표적 할일</label>
          <input
            type="text"
            placeholder="ex)짐캐리 『이터널 선샤인』"
            {...register("todo", { required: true, maxLength: 80 })}
          />
          {errors.todo && <span>This field is required</span>}
          <label>모임장 이름 및 설명</label>
          <input
            type="text"
            placeholder="모임장"
            {...register("people", { required: true, maxLength: 80 })}
          />
          {errors.people && <span>This field is required</span>}
          <span>people show</span>
          <input
            type="checkbox"
            placeholder="peopleshow"
            {...register("peopleshow", {})}
          />

          <label>장르</label>
          <select {...register("genre")}>
            <option value="영화">영화</option>
            <option value="음악">음악</option>
            <option value="미술">미술</option>
            <option value="액티비티">액티비티</option>
            <option value="심리">심리</option>
            <option value="자기계발">자기계발</option>
            <option value="이벤트">이벤트</option>
          </select>
          <label>아지트 선택</label>
          <select {...register("location")}>
            <option value="강남 아지트">강남 아지트</option>
            <option value="안국 아지트">안국 아지트</option>
            <option value="대학로 아지트">대학로 아지트</option>
            <option value="홍대 아지트">홍대 아지트</option>
          </select>
          <label>모임일 선택</label>
          <select {...register("meetday")}>
            <option value="1주, 3주 토요일">1주, 3주 토요일</option>
            <option value="1주, 3주 일요일">1주, 3주 일요일</option>
            <option value="2주, 4주 토요일">2주, 4주 토요일</option>
            <option value="2주, 4주 일요일">2주, 4주 일요일</option>
          </select>
          <label>첫 모임일</label>
          <input
            type="datetime-local"
            placeholder="첫모임일"
            {...register("firstmeet", { required: true })}
          />
          {errors.firstmeet && <span>This field is required</span>}
          <label>하고 싶은 말(20자 안으로)</label>
          <input
            type="text"
            placeholder="간단하고싶은말"
            {...register("comment", { required: true, maxLength: 20 })}
          />
          {errors.comment && <span>This field is required</span>}
          <input type="submit" value="다음" />
        </form>
      </div>
    </AdminLayout>
  );
}

export default observer(App);
