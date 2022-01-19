import { useCallback } from "react";
import router from "next/router";
import { observer } from "mobx-react";
import AdminLayout from "@components/layouts/Admin/layout";
import QuillEditorView from "@components/modules/QuillEditor/QuillEditorView";
import {
  AdminBoxBtn,
  WrapQuillText
} from "@components/modules/QuillEditor/styles";

function Detail() {
  // basicinfo 화면으로 이동
  const onPrev = useCallback(() => {
    router.push("./basicInfo");
  }, []);

  // 등록화면으로 이동
  const onSubmit = useCallback(() => {
    router.push("./confirm");
  }, []);

  return (
    <AdminLayout>
      <WrapQuillText>
        <QuillEditorView category="상품등록" />
        <AdminBoxBtn>
          <button onClick={onPrev}>이전으로 가기</button>
          <button onClick={onSubmit}>확인</button>
        </AdminBoxBtn>
      </WrapQuillText>
    </AdminLayout>
  );
}

export default observer(Detail);
