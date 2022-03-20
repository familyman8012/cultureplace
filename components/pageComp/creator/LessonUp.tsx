import * as tus from "tus-js-client";
import React, { useEffect, useRef, useState } from "react";
import { Stream } from "@cloudflare/stream-react";
import { css } from "@emotion/react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { countBy } from "lodash";
import { IProduct } from "@src/typings/db";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReactMarkdown from "react-markdown";
// import MarkdownPreview from "@uiw/react-markdown-preview";

function LessonUp({
  _id,
  file,
  setFile,
  lessonInfo,
  setLessonInfo,
  handlerCloseVodModal
}: any) {
  const [videoMediaId, setVideoMediaId] = useState("");
  const [percent, setPercent] = useState(0);
  const [showAddLesoon, setShowAddLesoon] = useState(false);

  const [showDetailLesson, setShowDetailLesson] = useState(null);

  let mediaId: string;
  let detailLessonData = null;

  const fetchLesson = async (_id: string) => {
    const res: { data: IProduct[] } = await axios.get(`/api/lesson?_id=${_id}`);
    console.log("fetchLesson res", res);
    return res.data;
  };

  const { data, refetch } = useQuery(["lesson"], () => fetchLesson(_id));

  const [winReady, setwinReady] = useState(false);

  useEffect(() => {
    setwinReady(true);
  }, []);

  const [vodList, setVodList] = useState({});

  const resetRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    data && setVodList(...data);
  }, [data]);

  const handleChange = (result: any) => {
    if (!result.destination) return;

    console.log(result);
    const items = vodList && [...vodList.lessons];
    const [reorderedItem] = items?.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setVodList({ ...vodList, lessons: [...items] });
    console.log("새로정렬", items);
  };

  console.log("vod todos", vodList);

  //비디오 파일 선택
  const onVideoSelectHadler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
    console.log("file", file);
  };

  const queryClient = useQueryClient();

  //비디오 업로드
  const onVideoUpload = () => {
    // Create a new tus upload
    var upload =
      file &&
      new tus.Upload(file, {
        endpoint:
          "https://api.cloudflare.com/client/v4/accounts/db9b0fffa2d74d68b02bbeb26b4aa52c/stream",
        headers: {
          Authorization: "Bearer 8HfYUPDvZEv0JSx2J7tD4WLpMR7e13fNIGd9kiZV"
        },
        resume: true,
        chunkSize: 50 * 1024 * 1024, // Required a minimum chunk size of 5MB, here we use 50MB.
        metadata: {
          name: "testesdsfs",
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
          console.log("videoMediaId", videoMediaId);
          axios
            .patch(`/api/lesson/${_id}`, {
              lessons: {
                ...lessonInfo,
                mediaId,
                filename: file.name
              }
            })
            .then(res => {
              console.log(res);
              setLessonInfo({ title: "", content: "", mediaId: "" });
              if (resetRef.current) {
                resetRef.current.value = "";
              }
              refetch();
            });
        },
        onAfterResponse: function (req, res) {
          return new Promise<void>(resolve => {
            var mediaIdHeader = res.getHeader("stream-media-id");
            if (mediaIdHeader) {
              mediaId = mediaIdHeader;
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
  };

  //비디오 삭제

  const deleteVideoHandler = (
    videoId: string,
    courseId: string,
    lessonId: string
  ) => {
    axios
      .delete(
        `https://api.cloudflare.com/client/v4/accounts/db9b0fffa2d74d68b02bbeb26b4aa52c/stream/${videoId}`,
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
            .delete(`/api/lesson/${courseId}?lessonId=${lessonId}`)
            .then(res => {
              console.log(res);
              refetch();
            });
        }
      })
      .catch(error => console.log(error));
  };

  const handlerWrite = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    console.log(e.target.value);
    setLessonInfo({ ...lessonInfo, [e.target.name]: e.target.value });
  };

  const handleShowAddLesson = () => {
    setShowAddLesoon(true);
  };

  const handleCloseAddLesson = () => {
    setLessonInfo({ title: "", content: "", mediaId: "" });
    if (resetRef.current) {
      resetRef.current.value = "";
    }
    setShowAddLesoon(false);
  };

  const handleLessonSubmit = async () => {
    await axios
      .put(`/api/lesson/${_id}`, vodList)
      .then(res => console.log(res));
  };

  const handleShowLayerLesson = (_id: string) => {
    setShowDetailLesson(data && data[0].lessons.filter(el => el._id === _id));
  };

  useEffect(() => {
    console.log("daafds", showDetailLesson);
  }, [showDetailLesson]);

  return (
    <div
      css={css`
        height: 80vh;
      `}
    >
      <div>{_id}</div>
      <div>
        {winReady && vodList && (
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
                    {vodList?.lessons?.map((vod, index) => (
                      <Draggable
                        key={vod._id}
                        draggableId={vod._id}
                        index={index}
                      >
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
                            <div>제목 : {vod.title}</div>

                            <button
                              onClick={() => handleShowLayerLesson(vod._id)}
                              css={css`
                                border: 1px solid;
                              `}
                            >
                              자세히 보기
                            </button>
                            <button
                              onClick={() =>
                                deleteVideoHandler(vod.mediaId, _id, vod._id)
                              }
                              css={css`
                                border: 1px solid;
                              `}
                            >
                              삭제
                            </button>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        )}
        {showDetailLesson === null && (
          <div>
            <button
              onClick={handleShowAddLesson}
              css={css`
                border: 1px solid;
                padding: 5px;
                margin-right: 10px;
              `}
            >
              레슨추가
            </button>
            <button
              onClick={handleLessonSubmit}
              css={css`
                border: 1px solid;
                padding: 5px;
              `}
            >
              Lesson 저장
            </button>
          </div>
        )}
      </div>

      {showAddLesoon && (
        <div
          css={css`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 10px;
            border: 1px solid;
            background: #fff;
          `}
        >
          <span
            className="btn_close"
            onClick={handleCloseAddLesson}
            css={css`
              position: absolute;
              top: 0;
              right: 20px;
            `}
          >
            x
          </span>
          <input
            type="text"
            name="title"
            css={css`
              border: 1px solid;
            `}
            onChange={handlerWrite}
            value={lessonInfo.title}
            placeholder="제목"
          />
          <textarea
            name="content"
            cols={7}
            rows={7}
            value={lessonInfo.content}
            className="form-control"
            onChange={handlerWrite}
          />
          <input
            type="file"
            id="upload"
            ref={resetRef}
            className="image-upload"
            onChange={e => onVideoSelectHadler(e)}
          />
          <button onClick={onVideoUpload}>전송</button>
          {/* <button onClick={handlerCloseVodModal}>닫기</button> */}
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
          <div>제목 : {showDetailLesson[0].title}</div>

          <div>mediaId : {showDetailLesson[0].mediaId}</div>
          <div>filename : {showDetailLesson[0].filename}</div>
          <div
            css={css`
              width: 300px;
            `}
          >
            <Stream controls src={showDetailLesson[0].mediaId} />
          </div>
          <div>
            내용 :{" "}
            <div>
              <ReactMarkdown>{showDetailLesson[0].content}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
      {/* <div>
        <button onClick={deleteVideoHandler}>비디오 삭제</button>
      </div> */}
    </div>
  );
}

export default LessonUp;
