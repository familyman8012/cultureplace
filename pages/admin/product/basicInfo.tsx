import { useCallback } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import router from "next/router";
// mobx
import { runInAction } from "mobx";
import { observer } from "mobx-react";
import { prodUpStore } from "@src/mobx/store";
// custom hook, css
import useImgUp from "@src/hooks/useImgUp";
import AdminLayout from "@src/components/layouts/Admin/layout";
import { BasicInfoForm, ErrorTxt } from "./styles";

function App() {
  //리액트 hook form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: prodUpStore.data && {
      ...prodUpStore.data,
      firstmeet: dayjs(prodUpStore.data.firstmeet).format(
        "YYYY-MM-DD[T]HH:mm:ss"
      )
    }
  });

  // 이미지 업로드 HOOK
  const [imgData, onImgUpHadler] = useImgUp("cardoriginal");

  const onSubmit = useCallback(
    data => {
      if (imgData === undefined && prodUpStore.data === null) {
        return alert("대표 이미지를 등록하셔야 합니다.");
      }

      const productData = {
        ...data,
        imgurl: `${imgData !== undefined ? imgData : prodUpStore.data.imgurl}`
      };
      console.log("productData", productData);
      runInAction(() => {
        prodUpStore.addProduct(productData);
      });
      router.push("/admin/product/detail");
    },
    [imgData]
  );

  return (
    <AdminLayout>
      <BasicInfoForm>
        <div className="box_imgupload">
          <span className="imgArea">
            {imgData !== "" ? (
              <img src={String(imgData)} alt="모임대표이미지" />
            ) : prodUpStore.data !== null ? (
              <img src={prodUpStore.data.imgurl} alt="모임대표이미지" />
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
            placeholder="ex) 유리의 쿠킹클래스, 힙스타의 힙한 댄스"
            id="title"
            {...register("title", { required: true, maxLength: 50 })}
          />
          {errors.title && errors.title.type === "required" && (
            <ErrorTxt>모임명을 입력해주세요.</ErrorTxt>
          )}
          {errors.title && errors.title.type === "maxLength" && (
            <ErrorTxt>50자 안으로 올바르게 올려주세요.</ErrorTxt>
          )}

          <label htmlFor="people">모임장 이름</label>
          <input
            type="text"
            id="people"
            placeholder="모임장"
            {...register("people", { required: true })}
          />
          {errors.people && errors.people.type === "required" && (
            <ErrorTxt>모임장 이름을 올려주세요.</ErrorTxt>
          )}

          <label htmlFor="genre">장르</label>
          <select id="genre" {...register("genre")}>
            <option value="영화">영화</option>
            <option value="미식">미식</option>
            <option value="패션">패션</option>
            <option value="뮤직">뮤직</option>
            <option value="미술">미술</option>
            <option value="연극/뮤지컬">연극/뮤지컬</option>
            <option value="번개">번개</option>
            <option value="지식">지식</option>
            <option value="힐링산책">힐링산책</option>
            <option value="직접해보기">직접해보기</option>
          </select>

          <label htmlFor="location">장소 선택</label>
          <select id="location" {...register("location")}>
            <option value="강남">강남</option>
            <option value="신촌">신촌</option>
            <option value="홍대">홍대</option>
            <option value="이태원">이태원</option>
            <option value="대학로">대학로</option>
            <option value="종로">종로</option>
            <option value="온라인">온라인</option>
          </select>

          <div className="box_radio_area">
            <h2>모임기간</h2>
            <label htmlFor="field-1day">
              <input
                {...register("meetingcycle")}
                type="radio"
                name="meetingcycle"
                value="oneday"
                id="field-1day"
                defaultChecked={true}
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
              />
              1Week
            </label>
          </div>

          {
            <>
              <label htmlFor="meetday">모임일 선택</label>
              <select id="meetday" {...register("meetday")}>
                <option value="월요일">월요일</option>
                <option value="화요일">화요일</option>
                <option value="수요일">수요일</option>
                <option value="목요일">목요일</option>
                <option value="금요일">금요일</option>
                <option value="토요일">토요일</option>
                <option value="일요일">일요일</option>
              </select>
            </>
          }

          <label htmlFor="firstmeet">첫 모임일</label>
          <input
            type="datetime-local"
            placeholder="첫모임일"
            id="firstmeet"
            {...register("firstmeet", { required: true })}
          />
          {errors.firstmeet && errors.firstmeet.type === "required" && (
            <ErrorTxt>첫 모임 일을 입력해주세요.</ErrorTxt>
          )}

          <label htmlFor="price">금액</label>
          <input
            type="number"
            id="price"
            placeholder="금액"
            {...register("price", { required: true })}
          />
          {errors.people && errors.people.type === "required" && (
            <ErrorTxt>금액을 입력해주세요.</ErrorTxt>
          )}
          <label htmlFor="saleprice">할인가</label>
          <input
            type="number"
            id="saleprice"
            placeholder="할인가"
            {...register("saleprice")}
          />

          <input type="submit" value="다음" />
        </form>
      </BasicInfoForm>
    </AdminLayout>
  );
}

export default observer(App);
