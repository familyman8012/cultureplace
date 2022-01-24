import React from "react";
import { CategoryMenu, IcoLink } from "./styles";
import { CategoryLink } from "@components/layouts/Head";
import Link from "next/link";

function index() {
  const CategoryMenuItem = [
    ...CategoryLink,
    { title: "1day", url: "/oneday" },
    { title: "1month", url: "/month" }
  ];
  return (
    <CategoryMenu>
      {CategoryMenuItem.map((el, i) => (
        <Link
          href={
            el.title === "1day" || el.title === "1month"
              ? `${el.url}`
              : `/view/${el.url}`
          }
          key={i}
          passHref
        >
          <IcoLink num={i}>{el.title}</IcoLink>
        </Link>
      ))}
    </CategoryMenu>
  );
}

export default index;
