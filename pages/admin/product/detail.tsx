import { useCallback } from "react";
import router from "next/router";
import { observer } from "mobx-react";
import AdminLayout from "@src/components/layouts/Admin/layout";
import QuillEditorView from "@src/components/views/QuillEditor/QuillEditorView";

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
      <QuillEditorView category="상품등록" />
      <div>
        <button onClick={onPrev}>이전으로 가기</button>
        <button onClick={onSubmit}>확인</button>
      </div>
    </AdminLayout>
  );
}

export default observer(Detail);
