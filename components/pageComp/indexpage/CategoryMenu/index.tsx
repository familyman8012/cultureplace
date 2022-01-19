import React from "react";
import CategoryMenu from "./styles";
import { CategoryLink } from "@components/layouts/Head";
import Link from "next/link";

function index() {
  return (
    <CategoryMenu>
      {CategoryLink.map((el, i) => (
        <Link href={`/view/${el.url}`} key={i}>
          <a>{el.title}</a>
        </Link>
      ))}
    </CategoryMenu>
  );
}

export default index;
