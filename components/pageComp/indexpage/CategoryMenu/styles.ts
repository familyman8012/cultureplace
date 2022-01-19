import styled from "@emotion/styled";

export const CategoryWrap = styled.div`
  width: 1150px;
  margin: 0 auto;
  .categoryLink {
    margin-bottom: -30px;
    padding: 40px 15px;
    text-align: center;
    overflow: auto;
    white-space: nowrap;
    -ms-overflow-style: none;
    a {
      margin-left: 16px;
      padding: 6px 16px;
      font-size: 14px;
      color: #4c57fd;
      border-radius: 17px;
      box-shadow: 0 2px 8px 0 rgb(0 0 0 / 12%);
      background-color: #ffffff;
      cursor: pointer;
      &:hover,
      &:focus {
        text-decoration: none;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);
      }
      &:nth-of-type(n) {
        color: #4c57fd;
        &:hover,
        &:focus {
          color: #3d46ca;
        }
      }
      &:nth-of-type(2n) {
        color: #6053f8;
        &:hover,
        &:focus {
          color: #4d42c6;
        }
      }
      &:nth-of-type(3n) {
        color: #744ff3;
        &:hover,
        &:focus {
          color: #5d3fc2;
        }
      }
      &:nth-of-type(4n) {
        color: #884bee;
        &:hover,
        &:focus {
          color: #6d3cbe;
        }
      }
      &:nth-of-type(5n) {
        color: #9d45e8;
        &:hover,
        &:focus {
          color: #7e37ba;
        }
      }
    }
  }
`;
