import React, { FC } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { darken, lighten } from "polished";

const sizes: any = {
  large: {
    height: "30rem",
    fontSize: "1.25rem",
  },
  medium: {
    height: "2.25rem",
    fontSize: "1rem",
  },
  small: {
    height: "1.75rem",
    fontSize: "0.875rem",
  },
};

const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  border-radius: 0.15rem;

  ${({ theme, color }: any) => {
    const selected = theme.color[color];
    return css`
      color: ${color === "sub" ? theme.color.white : "black"};
      background: ${selected};
    `;
  }}

  ${({ size }: any) => {
    return css`
      height: ${sizes[size].height};
      font-size: ${sizes[size].fontSize};
    `;
  }}
`;

const Button: FC<any> = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
