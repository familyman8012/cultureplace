import React, { useState, useEffect, useMemo, useRef } from "react";
import { useVod } from "@src/hooks/api/useVod/useNotice";
import { css } from "@emotion/react";
import { Stream } from "@cloudflare/stream-react";
import Collapsible from "react-collapsible";
import SimpleBar from "simplebar-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import {
  faSignal,
  faCheck,
  faAngleLeft,
  faAngleRight
} from "@fortawesome/free-solid-svg-icons"; // import the icons you need
import "simplebar/dist/simplebar.min.css";
import { useSession } from "next-auth/client";
import axios from "axios";
import { useComplete } from "@src/hooks/api/useVod/useComplete";
import {
  ListItem,
  ListWrap,
  LoadMask,
  StateIcon,
  VodContArea,
  VodWrap
} from "./styles";
import { useQuery, useMutation, useQueryClient } from "react-query";

function Left({ _id, sessionId }: any) {
  const queryClient = useQueryClient();
  const { data, refetch } = useVod(String(_id));

  const { data: completeData } = useComplete(String(sessionId), String(_id));

  console.log("completeData completeData", completeData);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selLesson, setSelLesson] = useState<any>(null);

  const [progressPer, setProgressPer] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [curTime, setCurTime] = useState(0);

  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [complete, setComplete] = useState(false);

  const [videoLoad, setVideoLoad] = useState({ Load: false, Loaded: false });
  const [listCollapse, setListCollapse] = useState(false);

  const videoInput: React.MutableRefObject<any> = useRef();
  const interval: { current: NodeJS.Timeout | null } = useRef(null);

  const videoAreaRef: React.MutableRefObject<any> = useRef();

  //비디오 컨트롤
  const handlerVideoControl = () => {
    videoInput.current.play();
    interval.current = setInterval(function () {
      setCurrent(videoInput.current.currentTime);
      setDuration(videoInput.current.duration);
    }, 1000);
  };
  const handlerComplete = useMutation(
    () =>
      axios
        .post("/api/product/complete", {
          userId: sessionId,
          productId: _id,
          lessonId: selLesson._id
        })
        .then(res => {
          console.log(res);
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["complete"]);
      },
      onError: (error, variables, context) => {
        // I will fire first
      }
    }
  );
  useEffect(() => {
    if (current > duration * 0.9 && !complete && duration > 0) {
      setComplete(true);
      //alert("레슨완료");
      handlerComplete.mutate();
    }
  }, [complete, current, duration, handlerComplete, interval]);
  let menuArry: { curriculumId: any; lessonId: any; medaiTime: any }[] =
    useMemo(() => [], []);

  useEffect(() => {
    menuArry.length = 0;
    data?.curriculum.map((el: any) =>
      el?.lessons.map((j: any) =>
        menuArry.push({
          curriculumId: el._id,
          lessonId: j._id,
          medaiTime: j.mediaTime
        })
      )
    );

    // 전체시간 구하기
    setTotalTime(
      menuArry?.reduce((acc, cur) => {
        return acc + cur.medaiTime;
      }, 0)
    );

    // 완료된 시간 구하기
    setCurTime(
      completeData?.lessonId
        .map((completeItem: string) =>
          menuArry.find(el => el?.lessonId === completeItem)
        )
        .reduce((acc: number, cur: any) => {
          console.log("acc acc", acc, "cur cur", cur?.medaiTime);
          return acc + cur?.medaiTime;
        }, 0)
    );

    setProgressPer(Number(((curTime / totalTime) * 100).toFixed(2)));
  }, [completeData, curTime, data, menuArry, totalTime]);

  useEffect(() => {
    setSelLesson(
      data?.curriculum
        .find((el: any) => el._id === menuArry[activeIndex].curriculumId)
        .lessons.find((el: any) => el._id === menuArry[activeIndex].lessonId)
    );
  }, [activeIndex, data?.curriculum, menuArry]);

  useEffect(() => {
    console.log("selLesson selLesson", selLesson);
  }, [selLesson]);

  const handlerSetSelLesson = () => {
    setSelLesson(
      data.curriculum
        .find((el: any) => el._id === menuArry[activeIndex].curriculumId)
        .lessons.find((el: any) => el._id === menuArry[activeIndex].lessonId)
    );
  };

  const handlerShowLesson = (
    number: number,
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    e.preventDefault();
    setActiveIndex(number);
    handlerSetSelLesson();
  };

  const handlerPrevLesson = () => {
    setActiveIndex(activeIndex => activeIndex - 1);
    handlerSetSelLesson();
  };

  const handlerNextLesson = () => {
    setActiveIndex(activeIndex => activeIndex + 1);
    handlerSetSelLesson();
  };

  const time = (seconds: number, type?: string) => {
    let hour = seconds / 3600 < 10 ? "0" + seconds / 3600 : seconds / 3600;
    let min =
      (seconds % 3600) / 60 < 10
        ? "0" + (seconds % 3600) / 60
        : (seconds % 3600) / 60;
    let sec = seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60;

    return parseInt(String(min)) + "분 " + sec + "초";
  };

  return (
    <VodWrap listCollapse={listCollapse}>
      <div className="wrap_vod_cont">
        <div className="top_time_area">
          <FontAwesomeIcon icon={faSignal}></FontAwesomeIcon>
          <span className="time">{time(selLesson?.mediaTime)}</span>
        </div>
        <h1 className="title">{selLesson?.title}</h1>
        {selLesson && (
          <VodContArea>
            <div
              className="stream_area"
              css={css`
                ${videoLoad.Loaded
                  ? "height:auto !important"
                  : `height:${videoAreaRef?.current?.offsetWidth * 0.563}px`}
              `}
              ref={videoAreaRef}
            >
              <Stream
                controls
                src={selLesson.mediaId}
                responsive={true}
                streamRef={videoInput}
                onLoadStart={() => setVideoLoad({ Load: true, Loaded: false })}
                onLoadedMetaData={() =>
                  setVideoLoad({ Load: false, Loaded: true })
                }
                onPlay={handlerVideoControl}
                preload={true}
                onPause={() =>
                  clearInterval(interval.current as NodeJS.Timeout)
                }
              />
            </div>
            <div dangerouslySetInnerHTML={{ __html: selLesson.content }} />
          </VodContArea>
        )}

        <div
          css={css`
            position: fixed;
            bottom: 0;
            height: 55px;
            left: 400px;
            width: calc(100% - 400px);
            z-index: 99;
            background: #fff;

            button {
              position: absolute;
              top: 50%;
              font-size: 14px;
              transform: translateY(-50%);
              &.prev {
                left: 0;
              }
              &.next {
                right: 40px;
              }
            }
          `}
        >
          <button
            className="prev"
            onClick={handlerPrevLesson}
            disabled={videoLoad.Load ? true : false}
          >
            <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon> 이전
          </button>
          {!completeData?.lessonId.some((el: any) => el === selLesson?._id) && (
            <button
              onClick={() => handlerComplete.mutate()}
              css={css`
                position: absolute;
                left: 50%;
                transform: translate(-50%, -50%) !important;
              `}
            >
              수강완료 체크하기
            </button>
          )}

          <button
            className="next"
            onClick={handlerNextLesson}
            disabled={videoLoad.Load ? true : false}
          >
            다음 <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
          </button>
        </div>
      </div>
      <div
        className="btn_list_collapse"
        onClick={() => setListCollapse(prev => !prev)}
      >
        <span className="wrap_arrow"></span>
      </div>
      <div className="wrap_vod_list">
        <div className="top">
          <h1 className="title">{data?.title}</h1>
          <div>
            <div
              className="progress-text"
              css={css`
                margin-top: 5px;
                font-size: 14px;
              `}
            >
              진도율 : {completeData?.lessonId.length}강/{menuArry?.length}강 |
              시간 : {Math.round(curTime / 60)}분/{Math.round(totalTime / 60)}분
            </div>
          </div>
          <div
            css={css`
              position: relative;
              width: 100%;
              height: 2px;
              margin-top: 40px;
              background: rgba(0, 0, 0, 0.3);
            `}
          >
            <div
              css={css`
                position: absolute;
                width: ${isNaN(progressPer) ? 0 : progressPer}%;
                height: 100%;
                background: #fff;
                transition: width 0.3s ease-in-out;

                .bubble {
                  position: absolute;
                  right: -20px;
                  top: -32px;
                  padding: 4px 8px;
                  color: #fff;
                  font-size: 12px;
                  border-radius: 2px;
                  background: rgba(0, 0, 0, 0.6);

                  &:after {
                    content: "";
                    position: absolute;
                    left: 40%;
                    bottom: -10px;
                    border: 5px solid;
                    border-color: rgba(0, 0, 0, 0.6) transparent transparent;
                  }
                }
              `}
            >
              <span className="bubble">
                {!isNaN(progressPer) && progressPer}%
              </span>
            </div>
          </div>
        </div>
        <SimpleBar className="simplebar">
          {data?.curriculum.map((curriculum: any, currindex: number) => (
            <ListWrap key={currindex}>
              {videoLoad.Load && <LoadMask></LoadMask>}
              <Collapsible
                key={currindex}
                trigger={<h2 className="title">{curriculum.title}</h2>}
                transitionTime={100}
                open={currindex === 0 ? true : false}
              >
                <ul>
                  {curriculum?.lessons.map(
                    (lesson: any, lessonindex: number) => (
                      <ListItem
                        key={lessonindex}
                        onClick={(
                          e: React.MouseEvent<HTMLLIElement, MouseEvent>
                        ) =>
                          handlerShowLesson(
                            currindex > 0
                              ? lessonindex +
                                  data.curriculum[currindex - 1].lessons.length
                              : lessonindex,
                            e
                          )
                        }
                        lessonId={lesson._id}
                        selLessonId={selLesson?._id}
                      >
                        <StateIcon
                          css={css`
                            ${completeData?.lessonId.map((el: any) => {
                              if (el === lesson._id) {
                                return "background:red;";
                              }
                            })}
                          `}
                        >
                          {completeData?.lessonId.map((el: any) => {
                            if (el === lesson._id) {
                              return (
                                <FontAwesomeIcon
                                  icon={faCheck}
                                ></FontAwesomeIcon>
                              );
                            }
                          })}
                        </StateIcon>
                        {lesson.title}
                      </ListItem>
                    )
                  )}
                </ul>
              </Collapsible>
            </ListWrap>
          ))}
        </SimpleBar>
      </div>
    </VodWrap>
  );
}

export default Left;
