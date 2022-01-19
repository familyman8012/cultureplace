import styled from "@emotion/styled";

export const InfinityCardwrap = styled.div<{ type?: string }>`
  display: grid;
  gap: 22px 27px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  ${({ type }) => type === "other" && " grid-template-columns: 1fr 1fr 1fr;"};
  ${({ type }) => type === "event" && " grid-template-columns: 1fr 1fr 1fr;"};
`;

export const LinkCard = styled.span`
  display: contents;
  margin: 12px;
`;
