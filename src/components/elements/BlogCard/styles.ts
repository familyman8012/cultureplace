import styled from "@emotion/styled";

export const BlogCardWrap = styled.div`
  overflow: hidden;

  dl,
  dt,
  dd {
    margin: 0;
    padding: 0;
  }

  .imgbox {
    overflow: hidden;
    width: 100%;
    border-radius: 10px;
    img {
      width: 100%;
    }
  }
  .txtbox {
    position: relative;
    dt {
      margin: 1.3rem 0;
      font-size: 1.9rem;
    }
    dd {
      &.desc {
        color: #464646;
        font-size: 15px;
      }
      &.create_at {
        margin-top: 0.8rem;
        font-size: 12px;
        line-height: 12px;
        color: #838380;
      }
      span {
        display: block;
        color: ${({ theme }) => theme.color.gray};
      }
    }
  }
`;
