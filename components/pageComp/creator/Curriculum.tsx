import { css } from "@emotion/react";
import { useVod } from "@src/hooks/api/useVod/useNotice";
import axios from "axios";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import LessonManagement from "./LessonManagement";

function Curriculum({ _id, handlerCloseVodModal }: any) {
  const { data, refetch } = useVod(String(_id));
  const queryClient = useQueryClient();

  const [writeCurriculum, setWriteCurriculum] = useState("");
  const [curriculumInfo, setCurriculumInfo] = useState({
    addCurriculumLayer: false,
    lessonLayer: false,
    productId: "",
    curriculumId: ""
  });

  const handlerWriteCurriculum = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWriteCurriculum(e.target.value);
  };

  const curriculumLayerClose = () => {
    handlerCloseVodModal();
    setCurriculumInfo({
      addCurriculumLayer: false,
      lessonLayer: false,
      productId: "",
      curriculumId: ""
    });
  };

  //레슨관리
  const handlerShowLessonLayer = (productId: string, curriculumId: string) => {
    setCurriculumInfo({
      addCurriculumLayer: false,
      lessonLayer: true,
      productId,
      curriculumId
    });
  };

  //수정
  const handlerShowModifyLayer = (productId: string, curriculumId: string) => {
    setCurriculumInfo({
      addCurriculumLayer: true,
      lessonLayer: false,
      productId,
      curriculumId
    });
  };

  //커리큘럼추가
  const handlerAddCuriculumn = useMutation(
    () =>
      axios
        .patch(`/api/curriculum/${_id}`, {
          curriculum: {
            title: writeCurriculum
          }
        })
        .then(res => {
          console.log(res);
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["curriculum"]);
        setCurriculumInfo({
          addCurriculumLayer: false,
          lessonLayer: false,
          productId: "",
          curriculumId: ""
        });
        setWriteCurriculum("");
      },
      onError: (error, variables, context) => {
        // I will fire first
      }
    }
  );

  //커리큘럼 수정
  const handlerModifyCuriculumn = useMutation(
    (curriculumId: string) =>
      axios
        .put(`/api/curriculum/${_id}?curriculumId=${curriculumId}`, {
          curriculum: {
            title: writeCurriculum
          }
        })
        .then(res => {
          console.log(res);
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["curriculum"]);
        setCurriculumInfo({
          addCurriculumLayer: false,
          lessonLayer: false,
          productId: "",
          curriculumId: ""
        });
        setWriteCurriculum("");
      },
      onError: (error, variables, context) => {
        // I will fire first
      }
    }
  );

  //커리큘럼 삭제
  const handlerDelCuriculumn = useMutation(
    (curriculumId: string) =>
      axios
        .delete(`/api/curriculum/${_id}?curriculumId=${curriculumId}`)
        .then(res => {
          console.log(res);
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["curriculum"]);
      },
      onError: (error, variables, context) => {
        // I will fire first
      }
    }
  );

  console.log("커리큘럼 data", data);

  return (
    <>
      <span className="btn_close" onClick={curriculumLayerClose}>
        x
      </span>
      <div className="cont">
        <div
          css={css`
            width: 500px;
            height: 500px;
          `}
        >
          {data?.title}
          <button
            css={css`
              margin-left: 30px;
              border: 1px solid;
            `}
            onClick={() =>
              setCurriculumInfo({
                ...curriculumInfo,
                addCurriculumLayer: true
              })
            }
          >
            커리큘럼추가
          </button>
          <div>
            {data &&
              data?.curriculum.map(
                (el: { _id: string; title: string }, i: number) => (
                  <div
                    key={i}
                    css={css`
                      display: flex;
                      margin-bottom: 10px;
                      padding: 20px;
                      border: 1px solid;
                    `}
                  >
                    <span>{el.title}</span>
                    <div
                      css={css`
                        margin-left: auto;
                      `}
                    >
                      <button
                        onClick={() => handlerShowLessonLayer(_id, el._id)}
                        css={css`
                          margin-right: 20px;
                        `}
                      >
                        레슨관리
                      </button>
                      <button
                        onClick={() => handlerShowModifyLayer(_id, el._id)}
                        css={css`
                          margin-right: 20px;
                        `}
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handlerDelCuriculumn.mutate(el._id)}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                )
              )}
          </div>
          {curriculumInfo.addCurriculumLayer && (
            <div
              css={css`
                position: absolute;
                top: 50%;
                left: 50%;
                width: 200px;
                height: 200px;
                transform: translate(-50%, -50%);
                border: 1px solid;
              `}
            >
              <div
                css={css`
                  position: absolute;
                  top: 10px;
                  right: 10px;
                `}
                onClick={() => {
                  setWriteCurriculum("");
                  setCurriculumInfo({
                    addCurriculumLayer: false,
                    lessonLayer: false,
                    productId: "",
                    curriculumId: ""
                  });
                }}
              >
                x
              </div>
              제목 :{curriculumInfo.curriculumId}
              <input
                type="text"
                name="title"
                onChange={handlerWriteCurriculum}
                // value={curriculum}
                value={writeCurriculum}
              />
              {curriculumInfo.productId === "" ? (
                <button onClick={() => handlerAddCuriculumn.mutate()}>
                  추가
                </button>
              ) : (
                <button
                  onClick={() =>
                    handlerModifyCuriculumn.mutate(curriculumInfo.curriculumId)
                  }
                >
                  수정
                </button>
              )}
            </div>
          )}
        </div>
        {curriculumInfo.lessonLayer && (
          <div
            css={css`
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 80vw;
              height: 80vh;
              border: 1px solid;
              background: #fff;
            `}
          >
            {curriculumInfo.productId}
            <LessonManagement
              productId={curriculumInfo.productId}
              curriculumId={curriculumInfo.curriculumId}
              curriculumInfo={curriculumInfo}
              setCurriculumInfo={setCurriculumInfo}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Curriculum;
