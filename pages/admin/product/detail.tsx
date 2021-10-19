import { useCallback } from "react";
import { observer } from "mobx-react";
import QuillEditorView from "@/../src/components/views/QuillEditor/QuillEditorView";
import AdminLayout from "../../../src/components/layouts/Admin/layout";
import { useRouter } from "next/router";

function Detail() {
  // 이전 : 이전 내용을 바꾸고 싶다면
  const router = useRouter();
  const onPrev = useCallback(() => {
    router.push("./basicInfo");
  }, []);

  // 다음 : 상세정보 등록 : 확인하고 db로 저장하기
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
