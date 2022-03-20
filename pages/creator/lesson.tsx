import React from "react";
import { prodUpStore } from "@src/mobx/store";

function Lesson() {
  console.log("prodUpStore?.data", prodUpStore?.data.genre);
  return <div>커리큘럼을 추가해보자</div>;
}

export default Lesson;
