import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface StyledComponentProps {
  type: string;
}

const typeStyle = ({ type }: StyledComponentProps) => {
  if (type === "basic") {
    return css`
      border-radius: 0.8rem;
      .imgbox {
        position: relative;
        height: 17rem;
      }
      .txtbox {
        height: 17.6rem;
        padding: 1.2rem;
        dt {
          font-size: 2rem;
        }
      }
    `;
  }
  if (type === "other") {
    return css`
      border: none;
      border-radius: 0;
      .imgbox {
        height: 22.9rem;
      }
      .txtbox {
        padding: 1.2rem 0;
        dt {
          font-size: 1.6rem;
          font-weight: 500;
          color: #7b7b7b;
        }
        dd {
          &.desc {
            font-size: 1.5rem;
          }
          &.meetinfobox {
            position: static;
            font-size: 1.4rem;
          }
        }
      }
    `;
  }
  if (type === "event") {
    return css`
      border-radius: 0;
      border: 1px solid #d8d8d8;
      .imgbox {
        height: 23.2rem;
      }
      .txtbox {
        position: relative;
        padding: 0;
        dt {
          height: 6rem;
          margin-bottom: 1rem;
          margin: 1.5rem 1.5rem 0;
          font-size: 2rem;
          border-bottom: 1px solid #d8d8d8;
        }
        dd {
          &.people {
            margin: 1rem;
          }
          &.meetinfobox {
            position: static;
            padding: 1rem 1.5rem;
            border-top: 1px solid #d8d8d8;
            background: #f7f7f7;
          }
        }
      }
    `;
  }
};

export const CardWrap = styled.div`
  overflow: hidden;
  border: 1px solid #ecece9;
  dl,
  dt,
  dd {
    margin: 0;
    padding: 0;
  }

  .imgbox {
    overflow: hidden;
    width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .txtbox {
    position: relative;

    dd {
      &.desc {
        font-size: 1.5rem;
      }
      &.meetinfobox {
        position: absolute;
        margin-bottom: 0;
        bottom: 1.2rem;
        font-size: 1.3rem;
      }
      &.todo {
        color: #1778b5;
        font-weight: 600;
        line-height: 1.8;
      }
      &.people {
        font-size: 14px;
      }
      span {
        color: ${({ theme }) => theme.color.gray};
      }
    }
  }
  ${typeStyle}
`;
