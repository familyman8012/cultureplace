import Head from "next/head";
import { useEffect, useState } from "react";
import QuillEditor from "./QuillEditor";
import styles from "../../../../styles/Home.module.css";
import { observer } from "mobx-react";
import { QuillStore } from "@/../src/mobx/store";

interface Props {
  category: string;
}

function QuillEditorView({ category }: Props) {
  const [mountBody, setMountBody] = useState(false); // 리렌더링 용도 state

  /* 외부에서 body의 수정이 일어난 경우 body에 자동으로 적용되지 않습니다!
     이 함수를 호출했을 때 컴포넌트 내 useEffect가 실행되어 body의 수정 사항이 적용됩니다.*/
  function rerenderBody() {
    setMountBody((mb) => !mb);
  }

  useEffect(() => {
    rerenderBody()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Quill Sample</title>
        <link rel="icon" href="/favicon.ico" />

        {/* 관련된 리소스 로드 */}
        <link
          href="//cdn.jsdelivr.net/npm/katex@0.13.3/dist/katex.min.css"
          rel="stylesheet"
        />
        <script src="//cdn.jsdelivr.net/npm/katex@0.13.3/dist/katex.min.js"></script>
        {/* <script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.7.2/build/highlight.min.js"></script> */}
        <script src="//cdn.quilljs.com/1.3.6/quill.min.js"></script>
        <script src="https://unpkg.com/quill-html-edit-button@2.2.7/dist/quill.htmlEditButton.min.js"></script>
        {/* <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.7.2/build/styles/default.min.css"
        /> */}
        <link rel="stylesheet" href="//cdn.quilljs.com/1.3.6/quill.snow.css" />
      </Head>

      <h1 className={styles.title}>{category}</h1>

      <div style={{ width: "80%", marginTop: "20px" }}>
        <QuillEditor mountBody={mountBody} />
      </div>
      <div style={{ width: "80%" }}>
        <p>QuillStore 미리보기</p>
        {QuillStore.data}
      </div>
    </div>
  );
}
export default observer(QuillEditorView);
