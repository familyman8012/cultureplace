/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import { darken, lighten } from "polished";

const SearchInp = styled.div`
  display: flex;
  width: 21.5rem;
  height: 3.5rem;
  border-radius: 0.15rem;
  border: 1px solid #ced4da;

  input {
    width: calc(100% - 5.2rem);
    padding: 0.375rem 0.75rem;
    font-size: 13px;
    outline: none;
    border: none;
  }
  button {
    width: 5.2rem;
    color: #fff;
    background: ${({ theme }: any) => theme.color.brand};

    &:hover {
      background: ${({ theme }: any) => lighten(0.1, theme.color.brand)};
    }
    &:active {
      background: ${({ theme }: any) => darken(0.1, theme.color.brand)};
    }
  }
`;

function Search() {
  return (
    <SearchInp>
      <input type="text" placeholder="모임명 검색" />
      <button>검색</button>
    </SearchInp>
  );
}

export default Search;
