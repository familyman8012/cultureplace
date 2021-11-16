import styled from "@emotion/styled";

export const BlogCardWrap = styled.div`
  overflow: hidden;
  width: 31%;
  border: none;
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
      height: 100%;
    }
  }
  .txtbox {
    position: relative;
    dt {
      margin: 0.8rem 0;
      font-size: 1.9rem;
    }
    dd {
      &.desc {
        font-size: 1.6rem;
      }
      &.create_at {
        margin-top: 0.8rem;
        font-size: 1.4rem;
        color: #838380;
      }
      span {
        display: block;
        color: ${({ theme }) => theme.color.gray};
      }
    }
  }
`;
