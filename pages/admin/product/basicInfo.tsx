/** @jsxImportSource @emotion/react */
import React, { useCallback, useState } from "react";
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
  const [is1day, setIs1day] = useState(true);

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
          <label htmlFor="title">모임명</label>
          <input
            type="text"
            placeholder="제목"
            id="title"
            {...register("title", { required: true, maxLength: 80 })}
          />
          {errors.title && <span>This field is required</span>}
          <label htmlFor="desc">설명</label>
          <input
            type="text"
            id="desc"
            placeholder="ex)가을에 와인한잔에 로맨스 영화 한편"
            {...register("desc", { required: true, maxLength: 80 })}
          />
          {errors.desc && <span>This field is required</span>}
          <label htmlFor="todo">대표적 할일</label>
          <input
            type="text"
            id="todo"
            placeholder="ex)짐캐리 『이터널 선샤인』"
            {...register("todo", { required: true, maxLength: 80 })}
          />
          {errors.todo && <span>This field is required</span>}
          <label htmlFor="people">모임장 이름 및 설명</label>
          <input
            type="text"
            id="people"
            placeholder="모임장"
            {...register("people", { required: true, maxLength: 80 })}
          />
          {errors.people && <span>This field is required</span>}
          <div
            css={css`
              display: flex;
              align-items: center;
              label {
                margin: 0;
              }
              input {
                width: fit-content !important;
                margin: 0 0 0 50px !important;
              }
            `}
          >
            <label htmlFor="peopleshow">people show</label>
            <input
              type="checkbox"
              id="peopleshow"
              placeholder="peopleshow"
              {...register("peopleshow", {})}
            />
          </div>

          <label htmlFor="genre">장르</label>
          <select id="genre" {...register("genre")}>
            <option value="영화">영화</option>
            <option value="음악">음악</option>
            <option value="소극장">소극장</option>
            <option value="서울걷기">서울걷기</option>
            <option value="성장하기">성장하기</option>
            <option value="심리매력">심리매력</option>
            <option value="직접해보기">직접해보기</option>
            <option value="이벤트">이벤트</option>
          </select>
          <label htmlFor="locaition">아지트 선택</label>
          <select id="locaition" {...register("location")}>
            <option value="강남 아지트">강남 아지트</option>
            <option value="안국 아지트">안국 아지트</option>
            <option value="대학로 아지트">대학로 아지트</option>
            <option value="홍대 아지트">홍대 아지트</option>
          </select>
          <div
            css={css`
              display: flex;
              label {
                width: 80px;
                display: flex;
                align-items: center;
                height: fit-content;
                &:nth-child(3) {
                  margin-left: 50px;
                }
              }
              input {
                margin: 0 !important;
              }
            `}
          >
            <label>모임기간</label>
            <label htmlFor="field-1day">
              <input
                {...register("meetingcycle")}
                type="radio"
                name="meetingcycle"
                value="1day"
                id="field-1day"
                defaultChecked={true}
                onClick={() => setIs1day(true)}
              />
              1Day
            </label>
            <label htmlFor="field-1month">
              <input
                {...register("meetingcycle")}
                type="radio"
                name="meetingcycle"
                value="1month"
                id="field-1month"
                onClick={() => setIs1day(false)}
              />
              1Week
            </label>
          </div>
          {!is1day && (
            <>
              <label htmlFor="meetday">모임일 선택</label>
              <select id="meetday" {...register("meetday")}>
                <option value="1주, 3주 토요일">1주, 3주 토요일</option>
                <option value="1주, 3주 일요일">1주, 3주 일요일</option>
                <option value="2주, 4주 토요일">2주, 4주 토요일</option>
                <option value="2주, 4주 일요일">2주, 4주 일요일</option>
              </select>
            </>
          )}
          <label htmlFor="firstmeet">첫 모임일</label>
          <input
            type="datetime-local"
            placeholder="첫모임일"
            id="firstmeet"
            {...register("firstmeet", { required: true })}
          />
          {errors.firstmeet && <span>This field is required</span>}
          <label htmlFor="comment">하고 싶은 말(20자 안으로)</label>
          <input
            type="text"
            placeholder="간단하고싶은말"
            id="comment"
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
