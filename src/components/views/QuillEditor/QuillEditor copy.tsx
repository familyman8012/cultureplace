// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import ReactS3Client from "react-aws-s3-typescript";
import { QuillStore } from "@/../src/mobx/store";


import dayjs from "dayjs";

export default function QuillEditor() {
  const quillElement = useRef();
  const quillInstance = useRef();

  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    setIsLoaded(prev => !prev);
    console.log(isLoaded)
  },[]);

  useEffect(() => {
    console.log("aaaaa")
    if (isLoaded) {
      /* isLoaded가 true인 상태에서 rerenderBody를 통해 body 적용시 Quill 초기화 없이
               innerHTML만 body로 바꿉니다. 이 조건이 없을 시 툴바가 중복되어 여러 개 나타나게
               됩니다. */
      const quill = quillInstance.current;
      quill.root.innerHTML = QuillStore.data;
      console.log("quill.root quill.root느느느느느느는ㄴ", quill.root)
      return;
    }
    if (quillElement.current && window.Quill) {
      /* isLoaded가 false일 때는 Quill을 초기화합니다. */
      console.log("bbbbbbssssssssasdasdas")
      var Embed = Quill.import('blots/block/embed');
      class Hr extends Embed {
        static create(value) {
            let node = super.create(value);
            // give it some margin
            node.setAttribute('style', "width:100%;border-bottom:1px solid #f3f3f6;");
            return node;
        }
    }

    Hr.blotName = 'hr'; //now you can use .ql-hr classname in your toolbar
    Hr.className = 'hr';
    Hr.tagName = 'hr';

    var customHrHandler = function(){
      // get the position of the cursor
      var range = quill.getSelection();
      if (range) {
          // insert the <hr> where the cursor is
          quill.insertEmbed(range.index,"hr","null")
      }
  }


      /* Quill 옵션을 원하는 대로 수정하세요. */
      const toolbarOptions = {
        container: [
          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike"], // toggled buttons
          [{'color': ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color']}, { background: [] }], // dropdown with defaults from theme
          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          [{ direction: "rtl" }], // text direction
          ["table", "hr", "blockquote", "link", "code-block", "formula", "image", "video"], // media
          ["clean"], // remove formatting button
        ],
        handlers: {
          'hr': customHrHandler
      }
      };
      Quill.register({
        'formats/hr': Hr
    });
      Quill.register("modules/htmlEditButton", htmlEditButton);
      Quill.register({
        'modules/tableUI': quillTableUI.default
      }, true)
      
      
      quillInstance.current = new window.Quill(quillElement.current, {
        modules: {
          history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true,
          },
          // syntax: true,
          toolbar: toolbarOptions,
          htmlEditButton: {},
          table: true,
          tableUI: true,
          imageResize: {
            // See optional "config" below
             modules: [ 'Resize', 'DisplaySize']
        }
        },
        placeholder: "본문 입력",
        theme: "snow",
      });

      // customize the color tool handler
      quillInstance.current.getModule('toolbar').addHandler('color', (value) => {

  // if the user clicked the custom-color option, show a prompt window to get the color
  if (value == 'custom-color') {
      value = prompt('Enter Hex/RGB/RGBA');
  }

  quillInstance.current.format('color', value);
});
     

      const quill = quillInstance.current;

      // 이미지 S3에 보냄.
      const toolbar = quill.getModule("toolbar");
      console.log("toolbar", toolbar);
      toolbar.addHandler("image", () => {
        onClickImageBtn();
      });

      // s3 upload setting start
      const onClickImageBtn = () => {
        // s3 upload setting
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = function (e) {
          const file = input.files[0];
          const nowDate = dayjs(Date.now()).format("YYMMDDHHMM");
          const fileName = `${nowDate}_${file?.name.replace(
            /(.png|.jpg|.jpeg|.gif)$/,
            ""
          )}`;

          const s3Config = {
            bucketName: "cultureplace",
            dirName: QuillStore.dir,
            region: "ap-northeast-2",
            accessKeyId: String(process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID),
            secretAccessKey: String(
              process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY
            ),
          };

          const s3 = new ReactS3Client(s3Config);
          const filename = "filename-to-be-uploaded";

          s3.uploadFile(file, fileName).then((data) => {
            if (data.status === 204) {
              //커서 위치 받아오기 위함.
              const range = quillInstance.current.getSelection(true);
              // 1.현재 커서 위치에 2. 이미지를 3.src="" 로 나타냄.
              quillInstance.current.insertEmbed(
                range.index,
                "image",
                `${data.location}`
              );

              // 이미지 업로드 후 커서 이미지 한칸 옆으로 이동.
              quillInstance.current.setSelection(range.index + 1);
            } else {
              alert("error");
            }
          });
        };
      };

      quill.root.setAttribute("spellcheck", "false");

      // 초기 body state 적용
      quill.root.innerHTML = QuillStore.data;

      /* quill에서 text-change 이벤트 발생시에 setBody(innerHTML)을 통해 body를 업데이트합니다.
               body가 업데이트되어도 useEffect 발생 조건 인자([isError, mountBody])에 body가 없으므로
               QuillEditor 컴포넌트는 다시 렌더링되지 않습니다. 이는 입력 중 커서가 맨 앞으로 이동하는
               문제를 방지합니다. 대신 외부에서 body가 수정되어도 rerenderBody가 호출되지 않으면 변경된
               body가 적용되지 않습니다. */
      quill.on("text-change", () => {
        //handleQuillChange(quill.root.innerHTML);
        QuillStore.data = quill.root.innerHTML;
      });

      setIsLoaded(true);


      

    } else {
      /* quill.min.js가 로드되어 있지 않아 window.Quill이 undefined이면 isError가
               계속 변경되면서 재시도합니다. */
      setIsError((prevIsError) => !prevIsError);
    }
  }, []);

  const tabelAdd = () => {
    const table = quillInstance.current.getModule('table');
    table.insertTable(3, 3)
  }


  return <><div ref={quillElement}></div>
  <button onClick={tabelAdd}>테이블 추가</button></>;
}
