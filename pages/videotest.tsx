import * as tus from "tus-js-client";
import React, { useEffect, useRef, useState } from "react";
import { Stream } from "@cloudflare/stream-react";
import { css } from "@emotion/react";
import axios from "axios";

function Videotest() {
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [complete, setComplete] = useState(false);
  const [file, setFile] = useState<File>();

  const [lessonInfo, setLessonInfo] = useState({
    title: "",
    desc: "",
    mediaId: ""
  });

  const videoInput: any = useRef();
  const interval: { current: NodeJS.Timeout | null } = useRef(null);

  //업로드
  const onImgUpHadler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
    console.log("file", file);
  };

  const imgSend = () => {
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
        },
        onSuccess: function () {
          console.log("Upload finished");
        },
        onAfterResponse: function (req, res) {
          return new Promise<void>(resolve => {
            var mediaIdHeader = res.getHeader("stream-media-id");
            if (mediaIdHeader) {
              const mediaId = mediaIdHeader;
              console.log(mediaId);
              axios.patch("/api/product/11", {
                lessons: { ...lessonInfo, mediaId }
              });
            }
            resolve();
          });
        }
      });

    // Check if there are any previous uploads to continue.
    upload &&
      upload.findPreviousUploads().then(function (previousUploads) {
        // Found previous uploads so we select the first one.
        if (previousUploads.length) {
          upload && upload.resumeFromPreviousUpload(previousUploads[0]);
        }

        // Start the upload
        upload && upload.start();
      });
  };

  //비디오 삭제

  const deleteVideoHandler = () => {
    axios
      .delete(
        "https://api.cloudflare.com/client/v4/accounts/db9b0fffa2d74d68b02bbeb26b4aa52c/stream/eec90ffbfe1e3ac41b2fa8e053dcd9d3",
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
        if (res.status === 200) return alert("동영상이 삭제 되었습니다.");
      })
      .catch(error => console.log(error));
  };

  //비디오 컨트롤
  const handlerVideoControl = () => {
    videoInput.current.play();
    interval.current = setInterval(function () {
      setCurrent(prev => videoInput.current.currentTime);
      setDuration(prev => videoInput.current.duration);
      console.log("interval", interval.current);
    }, 1000);
  };
  useEffect(() => {
    if (current > duration * 0.8 && !complete && duration > 0) {
      setComplete(true);
    }
    if (current >= duration) {
      clearInterval(interval.current as NodeJS.Timeout);
    }
  }, [complete, current, duration, interval]);

  const handlerWrite = (e: { target: { name: any; value: any } }) => {
    setLessonInfo({ ...lessonInfo, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <input
        type="text"
        name="title"
        onChange={handlerWrite}
        value={lessonInfo.title}
      />
      <input
        type="text"
        name="desc"
        onChange={handlerWrite}
        value={lessonInfo.desc}
      />
      <input
        type="file"
        id="upload"
        className="image-upload"
        onChange={e => onImgUpHadler(e)}
      />
      <button onClick={imgSend}>전송</button>
      <div
        css={css`
          width: 800px;
        `}
      >
        <Stream
          controls
          src="dd37c67942b733e6babf2fd879b79e5a"
          streamRef={videoInput}
          // onEnded={() => alert("동영상 완료")}
        />

        <button onClick={handlerVideoControl}>비디오 재생</button>
        <button onClick={() => videoInput.current.pause()}>비디오 정지</button>
      </div>
      {current > 0 && (
        <span>
          {current} / {duration}
        </span>
      )}
      {complete && <span>체크</span>}
      <div>
        <button onClick={deleteVideoHandler}>비디오 삭제</button>
      </div>
    </div>
  );
}

export default Videotest;
