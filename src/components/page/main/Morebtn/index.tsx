import { css } from "@emotion/react";
import Button from "@src/components/elements/Button";

function index() {
  const moreBtn = css`
    display: block;
    width: 33.6rem;
    margin: 120px auto 0;
  `;
  return (
    <Button color="brand" size="m" outline css={moreBtn}>
      클럽 모두 보러가기
    </Button>
  );
}

export default index;
