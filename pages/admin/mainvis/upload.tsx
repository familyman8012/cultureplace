import React, { useCallback } from "react";
import AdminLayout from "../../../src/components/layouts/Admin/layout";

import { Image } from "antd";
import useImgUp from "@/../src/hooks/useImgUp";
import axios from "axios";

function Mainvis() {
  //이미지 업로드 훅
  const [imgData, setImgData, onImgUpHadler] = useImgUp("mainvispc");
  const [imgData2, setImgData2, onImgUpHadler2] = useImgUp("mainvismo");

  const onSubmit = () => {
    console.log("imgData", imgData, "imgData2", imgData2);
    axios
      .post("/api/mainvisimg", {
        pclocation: imgData.replace(/\/mainvispc\//, "/mainvis/"),
        molocation: imgData2.replace(/\/mainvismo\//, "/mainvis/"),
      })
      .then((res) => console.log("Res느느느느느111", res));
  };
  return (
    <AdminLayout>
      <div>
        <h2>pc 버젼</h2>
        <span>
          <Image
            width={255}
            height={170}
            src={imgData}
            alt="모임대표이미지 등록"
          />
        </span>
        <input
          type="file"
          id="upload"
          className="image-upload"
          onChange={onImgUpHadler}
        />
      </div>
      <div>
        <h2>모바일 버젼</h2>
        <span>
          <Image
            width={255}
            height={170}
            src={imgData2}
            alt="모임대표이미지 등록"
          />
        </span>
        <input
          type="file"
          id="upload"
          className="image-upload"
          onChange={onImgUpHadler2}
        />
      </div>
      <span onClick={onSubmit}>확인</span>
    </AdminLayout>
  );
}

export default Mainvis;
