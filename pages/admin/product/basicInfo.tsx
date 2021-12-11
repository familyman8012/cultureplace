import { useCallback, useState } from "react";
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
  const [imgData, setImgData, onImgUpHadler] = useImgUp("cardoriginal");

  // 원데이 세션인지 확인
  const [is1day, setIs1day] = useState(true);

  const onSubmit = useCallback(
    data => {
      if (imgData === undefined && prodUpStore.data === null) {
        return alert("대표 이미지를 등록하셔야 합니다.");
      }

      const productData = {
        ...data,
        imgurl: `${imgData !== undefined ? imgData : prodUpStore.data.imgurl}`
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
            placeholder="제목"
            id="title"
            {...register("title", { required: true, maxLength: 12 })}
          />
          {errors.title && errors.title.type === "required" && (
            <ErrorTxt>모임명을 입력해주세요.</ErrorTxt>
          )}
          {errors.title && errors.title.type === "maxLength" && (
            <ErrorTxt>12자 안으로 올바르게 올려주세요.</ErrorTxt>
          )}

          <label htmlFor="desc">설명</label>
          <input
            type="text"
            id="desc"
            placeholder="ex)가을에 와인한잔에 로맨스 영화 한편"
            {...register("desc", { required: true, maxLength: 60 })}
          />
          {errors.desc && errors.desc.type === "required" && (
            <ErrorTxt>설명을 입력해주세요.</ErrorTxt>
          )}
          {errors.desc && errors.desc.type === "maxLength" && (
            <ErrorTxt>60자 안으로 올바르게 올려주세요.</ErrorTxt>
          )}

          <label htmlFor="todo">대표적 할일</label>
          <input
            type="text"
            id="todo"
            placeholder="ex)짐캐리 『이터널 선샤인』"
            {...register("todo", { required: true, maxLength: 12 })}
          />
          {errors.todo && errors.todo.type === "required" && (
            <ErrorTxt>모임에서 할 일을 입력해주세요.</ErrorTxt>
          )}
          {errors.todo && errors.todo.type === "maxLength" && (
            <ErrorTxt>12자 안으로 올바르게 올려주세요.</ErrorTxt>
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

          <div className="box_check_area">
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

          <label htmlFor="location">아지트 선택</label>
          <select id="location" {...register("location")}>
            <option value="강남">강남 아지트</option>
            <option value="안국">안국 아지트</option>
            <option value="대학로">대학로 아지트</option>
            <option value="홍대">홍대 아지트</option>
            <option value="온라인">온라인</option>
          </select>

          <div className="box_radio_area">
            <label>모임기간</label>
            <label htmlFor="field-1day">
              <input
                {...register("meetingcycle")}
                type="radio"
                name="meetingcycle"
                value="oneday"
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
                <option value="매 주 목요일">매 주 목요일</option>
                <option value="매 주 토요일">매 주 토요일</option>
                <option value="매 주 일요일">매 주 일요일</option>
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
          {errors.firstmeet && errors.firstmeet.type === "required" && (
            <ErrorTxt>첫 모임 일을 입력해주세요.</ErrorTxt>
          )}

          <label htmlFor="comment">하고 싶은 말(20자 안으로)</label>
          <input
            type="text"
            placeholder="간단하고싶은말"
            id="comment"
            {...register("comment", { required: true, maxLength: 20 })}
          />
          {errors.comment && errors.comment.type === "required" && (
            <ErrorTxt>간단 하고 싶은 말을 입력해주세요.</ErrorTxt>
          )}
          {errors.comment && errors.comment.type === "maxLength" && (
            <ErrorTxt>20자 안으로 올바르게 올려주세요.</ErrorTxt>
          )}
          <input type="submit" value="다음" />
        </form>
      </BasicInfoForm>
    </AdminLayout>
  );
}

export default observer(App);
