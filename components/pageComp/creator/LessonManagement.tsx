import { css } from "@emotion/react";
import { useVod } from "@src/hooks/api/useVod/useNotice";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import QuillEditorView from "@components/modules/QuillEditor/QuillEditorView";
import { observer } from "mobx-react";
import { noticeStore, QuillStore } from "@src/mobx/store";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import * as tus from "tus-js-client";
import { Stream } from "@cloudflare/stream-react";
import { runInAction } from "mobx";

function LessonManagement({
  productId,
  curriculumId,
  curriculumInfo,
  setCurriculumInfo
}: any) {
  const { data, refetch } = useVod(String(productId));

  let mediaId: string;
  let mediaTime: Number;

  const [winReady, setwinReady] = useState(false);
  const [selCurriculum, setSelCurriculum] = useState<any>(null);

  const [lessonLayer, setLessonLayer] = useState({
    state: "",
    show: false,
    selectIndex: 0
  });

  const [file, setFile] = useState<any>("");

  const [percent, setPercent] = useState(0);
  const [delMediaId, setdelMediaId] = useState("");

  const [showDetailLesson, setShowDetailLesson] = useState<any>(null);

  const resetRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setwinReady(true);
  }, []);

  useEffect(() => {
    console.log(file);
  }, [file]);

  useEffect(() => {
    setSelCurriculum(
      data.curriculum.find((el: any) => el._id === curriculumId)
    );
  }, [curriculumId, data]);

  useEffect(() => {
    console.log("daafds", showDetailLesson);
  }, [showDetailLesson]);

  console.log("productId productId", productId, data, selCurriculum);

  const handlerWrite = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    console.log(e.target.value);
    // setLessonInfo({ ...lessonInfo, [e.target.name]: e.target.value });
    runInAction(() => {
      QuillStore.titleData = e.target.value;
    });
  };

  const queryClient = useQueryClient();

  //비디오 파일 선택
  const onVideoSelectHadler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  //reset
  const lessonLayerClose = () => {
    QuillStore.titleData = "";
    QuillStore.data = "";
    mediaId = "";
    mediaTime = 0;
    setFile("");
    setPercent(0);
    if (resetRef.current) {
      resetRef.current.value = "";
    }
    setLessonLayer({ state: "", show: false, selectIndex: 0 });
  };

  const addLessonFunc = () => {
    axios
      .post(`/api/lesson/${productId}?curriculumId=${curriculumId}`, {
        lessons: {
          title: QuillStore.titleData,
          content: QuillStore.data,
          mediaId,
          mediaTime,
          filename: file?.name
        }
      })
      .then(res => {
        refetch();
        lessonLayerClose();
        alert("레슨추가가 완료되었습니다.");
      });
  };

  const modAxios = () => {
    axios
      .patch(
        `/api/lesson/${productId}?curriculumId=${curriculumId}&lessonIndex=${lessonLayer.selectIndex}`,
        {
          lessons: {
            title: QuillStore.titleData,
            content: QuillStore.data,
            mediaId,
            mediaTime,
            filename: file?.name
          }
        }
      )
      .then(res => {
        console.log(res);
        refetch();
        lessonLayerClose();
        alert("레슨수정이 완료되었습니다.");
      });
  };

  const modLessonFunc = () => {
    // alert(lessonLayer.selectId);
    axios
      .delete(
        `https://api.cloudflare.com/client/v4/accounts/db9b0fffa2d74d68b02bbeb26b4aa52c/stream/${delMediaId}`,
        {
          headers: {
            Authorization: "Bearer 8HfYUPDvZEv0JSx2J7tD4WLpMR7e13fNIGd9kiZV"
          }
        }
      )
      .then(res => {
        if (res.status === 200) {
          console.log("vod 수정시 기존 vod 삭제");
        }
        modAxios();
      })
      .catch(error => {
        if (error.response.status === 404) {
          modAxios();
        }
      });
  };

  //레슨추가
  const handlerLessonButton = (buttonTitle: string) => {
    if (!file) {
      return alert("동영상을 등록하셔야 합니다.");
    }
    // Create a new tus upload
    var upload =
      file &&
      new tus.Upload(file, {
        endpoint:
          "https://api.cloudflare.com/client/v4/accounts/db9b0fffa2d74d68b02bbeb26b4aa52c/stream",
        headers: {
          Authorization: "Bearer 8HfYUPDvZEv0JSx2J7tD4WLpMR7e13fNIGd9kiZV"
        },
        //resume: true,
        chunkSize: 50 * 1024 * 1024, // Required a minimum chunk size of 5MB, here we use 50MB.
        metadata: {
          name: QuillStore.titleData,
          filename: file.name,
          filetype: file.type,
          allowedorigins: ["localhost:3000"]
        },
        onError: function (error) {
          throw error;
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          console.log(bytesUploaded, bytesTotal, percentage + "%");
          setPercent(Number(percentage));
        },
        onSuccess: async function () {
          if (buttonTitle === "add") {
            addLessonFunc();
          } else if (buttonTitle === "mod") {
            modLessonFunc();
            console.log("mediaTime2 mediaTime2", mediaTime);
          }
        },
        onAfterResponse: function (req, res) {
          return new Promise<void>(resolve => {
            var mediaIdHeader = res.getHeader("stream-media-id");
            if (mediaIdHeader) {
              mediaId = mediaIdHeader;
            }
            if (file) {
              var objectUrl = URL.createObjectURL(file);
              document.getElementById("vid")?.setAttribute("src", objectUrl);
              document
                .getElementById("vid")
                ?.addEventListener("loadedmetadata", function () {
                  mediaTime = Math.round(
                    (document.getElementById("vid") as HTMLMediaElement)
                      ?.duration
                  );
                  console.log("mediaTime mediaTime", mediaTime);
                });
            }
            resolve();
          });
        }
      });

    // Check if there are any previous uploads to continue.
    upload &&
      upload
        .findPreviousUploads()
        .then(function (previousUploads: string | any[]) {
          // Found previous uploads so we select the first one.
          if (previousUploads.length) {
            upload && upload.resumeFromPreviousUpload(previousUploads[0]);
          }

          // Start the upload
          upload && upload.start();
        });

    console.log("upload upload", upload);
  };

  //레슨 삭제 -> video 까지.
  const deleteVideoHandler = (lessonId: string, mediaId: string) => {
    console.log(lessonId, mediaId);
    axios
      .delete(
        `https://api.cloudflare.com/client/v4/accounts/db9b0fffa2d74d68b02bbeb26b4aa52c/stream/${mediaId}`,
        {
          // headers: {
          //   "X-Auth-Email": "yyagency7@gmail.com",
          //   "X-Auth-Key": "76caac74ee222180daf1791f44bf8adb89bfc",
          //   "Content-Type": "application/json"
          // }
          headers: {
            Authorization: "Bearer 8HfYUPDvZEv0JSx2J7tD4WLpMR7e13fNIGd9kiZV"
          }
        }
      )
      .then(res => {
        if (res.status === 200) {
          alert("동영상이 삭제 되었습니다.");
          axios
            .delete(
              `/api/lesson/${productId}?curriculumId=${curriculumId}&lessonId=${lessonId}`
            )
            .then(res => {
              console.log(res);
              refetch();
            });
        }
      })
      .catch(error => console.log(error));
  };

  // 레슨 수정 레이어
  const showModLessonLayer = (
    lessonId: string,
    index: number,
    mediaId: string
  ) => {
    console.log("lessonId", lessonId);
    const modLesson = selCurriculum.lessons.find(
      (el: any) => el._id === lessonId
    );
    console.log("modLesson", modLesson);
    QuillStore.titleData = modLesson.title;
    QuillStore.data = modLesson.content;
    setLessonLayer({ state: "modify", show: true, selectIndex: index });
    setdelMediaId(mediaId);
  };

  //레슨 디테일 수정

  // 레슨 순서 수정
  const handlerModLessonList = useMutation(
    () =>
      axios
        .put(
          `/api/lesson/${productId}?curriculumId=${curriculumId}`,
          selCurriculum.lessons
        )
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

  //드래그 & 드로그
  const handleChange = (result: any) => {
    if (!result.destination) return;

    console.log(result);
    const items = selCurriculum && [...selCurriculum.lessons];
    const [reorderedItem] = items?.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelCurriculum({ ...selCurriculum, lessons: [...items] });

    console.log("새로정렬", items);
  };

  const handleShowLayerLesson = (_id: string) => {
    setShowDetailLesson(
      selCurriculum &&
        selCurriculum.lessons.find((el: { _id: string }) => el._id === _id)
    );
  };

  return (
    <div>
      <div>
        <span>{selCurriculum?.title}</span>
        <button
          onClick={() =>
            setLessonLayer({ state: "add", show: true, selectIndex: 0 })
          }
          css={css`
            margin-left: 50px;
          `}
        >
          레슨추가
        </button>
        <button
          onClick={() =>
            setCurriculumInfo({
              ...curriculumInfo,
              lessonLayer: false
            })
          }
        >
          닫기
        </button>
      </div>
      {winReady && selCurriculum && (
        <div
          css={css`
            overflow: auto;
            max-height: 600px;
          `}
        >
          <DragDropContext onDragEnd={handleChange}>
            <Droppable droppableId="vodList">
              {provided => (
                <ul
                  className="vodList"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {selCurriculum?.lessons?.map((el: any, index: number) => (
                    <Draggable key={el._id} draggableId={el._id} index={index}>
                      {provided => (
                        <li
                          css={css`
                            cursor: grab;
                            padding: 15px;
                            margin-bottom: 15px;
                            border: 1px solid #eee;
                            div {
                              overflow: hidden;
                              height: 24px;
                            }
                          `}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          <div>
                            {el.title}{" "}
                            <button
                              onClick={() =>
                                showModLessonLayer(el._id, index, el.mediaId)
                              }
                            >
                              수정
                            </button>
                            <button
                              css={css`
                                margin: 0 20px;
                              `}
                              onClick={() => handleShowLayerLesson(el._id)}
                            >
                              자세히 보기
                            </button>
                            <button
                              onClick={() =>
                                deleteVideoHandler(el._id, el.mediaId)
                              }
                            >
                              삭제
                            </button>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
          <div>
            <button onClick={() => handlerModLessonList.mutate()}>
              레슨저장
            </button>
          </div>
        </div>
      )}
      {lessonLayer.show && (
        <div
          css={css`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60vw;
            height: 500px;
            padding: 20px 0;
            border: 1px solid;
            background: #fff;
          `}
        >
          <div>
            추가레이어
            <button onClick={lessonLayerClose}>x</button>
            <input
              type="text"
              name="title"
              css={css`
                border: 1px solid;
              `}
              onChange={handlerWrite}
              value={QuillStore.titleData || ""}
              placeholder="제목"
            />
            <video
              controls
              width="500px"
              id="vid"
              css={css`
                display: none;
              `}
            ></video>
            <QuillEditorView category="vod등록" />
            <div
              css={css`
                margin: 15px 0;
              `}
            >
              <input
                type="file"
                id="upload"
                ref={resetRef}
                className="image-upload"
                onChange={onVideoSelectHadler}
              />
            </div>
            <div
              css={css`
                position: relative;
                width: 100%;
                height: 20px;
                margin: 20px 0;
                background: #d1d1d1;
              `}
            >
              <div
                css={css`
                  width: ${percent}%;
                  height: 20px;
                  background: #fdc53f;
                `}
              ></div>
              <span
                css={css`
                  position: absolute;
                  top: 0;
                  left: 50%;
                  transform: translateX(-50%);
                `}
              >
                전송율 {percent}%
              </span>
            </div>
            {lessonLayer.state === "add" ? (
              <button onClick={() => handlerLessonButton("add")}>추가</button>
            ) : (
              <button onClick={() => handlerLessonButton("mod")}>수정</button>
            )}
          </div>
        </div>
      )}
      {showDetailLesson !== null && (
        <div
          css={css`
            position: absolute;
            top: 50%;
            left: 50%;
            width: 80%;
            height: 80vh;
            padding: 20px;
            border: 1px solid;
            transform: translate(-50%, -50%);
            background: #fff;
          `}
        >
          <span
            css={css`
              position: absolute;
              top: 10px;
              right: 20px;
            `}
            onClick={() => setShowDetailLesson(null)}
          >
            x
          </span>
          <div>제목 : {showDetailLesson.title}</div>

          <div>mediaId : {showDetailLesson.mediaId}</div>
          <div>mediaTime : {showDetailLesson.mediaTime}</div>
          <div>filename : {showDetailLesson.filename}</div>
          <div
            css={css`
              width: 300px;
            `}
          >
            <Stream controls src={showDetailLesson.mediaId} />
          </div>
          <div>
            내용 :{" "}
            <div
              dangerouslySetInnerHTML={{ __html: showDetailLesson.content }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default observer(LessonManagement);
