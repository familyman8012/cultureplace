/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const ProductUploadForm = css`
  width: 49rem;
  margin: 0 auto;

  > div {
    display: flex;
    span {
      width: 255px;
      height: 170px;
      border: 1px solid #ddd;
    }
    input:not([type="checkbox"]) {
      width: calc(100% - 255px);
      height: 170px;
      margin-bottom: 0;
    }
  }

  label {
    display: block;
    margin: 15px 0 5px;
    font-weight: bold;
    color: #aaa;
  }

  select,
  input:not([type="checkbox"]) {
    display: block;
    box-sizing: border-box;
    width: 100%;
    border-radius: 0.4rem;
    border: 1px solid #ddd;
    padding: 1rem 3.5rem 1rem 1.5rem;
    margin-bottom: 1.5rem;
    font-size: 14px;
  }

  input[type="checkbox"] {
    border: 1px solid;
    appearance: auto;
    margin-left: 30px;
  }

  input[type="submit"],
  .button {
    background: #ec5990;
    color: white;
    text-transform: uppercase;
    border: none;
    margin-top: 2rem;
    padding: 1rem;
    font-size: 16px;
    font-weight: bold;
    display: block;
    appearance: none;
    border-radius: 0.4rem;
    width: 100%;
    font-weight: lighter;
  }
`;

export const confirmStyle = css`
  width: 64rem;
  margin: 0 auto;
  p {
    margin-top: 10px;
    font-size: 20px;
  }
  .list {
    margin-top: 40px;
    p {
      font-size: 20px;
    }
    span {
      display: block;
      width: 255px;
      height: 170px;
      border: 1px solid #ddd;
    }
    dl {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      margin-top: 30px;
      dt,
      dd {
        width: 80%;
        height: 70px;
        line-height: 70px;
        border: 1px solid #ddd;
        box-sizing: border-box;

        background: #fff;
      }
      dt {
        width: 20%;
        text-align: center;
      }
      dd {
        padding-left: 30px;
      }
    }
  }
  .content {
    overflow-y: auto;
    width: 100%;
    min-height: 800px;
    max-height: 800px;
    padding: 20px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    background: #fff;
  }
`;
export default () => <pre>Header</pre>;
