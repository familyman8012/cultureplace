import Button from "@components/elements/Button";
import { moreBtn } from "./styles";

function index() {
  return (
    <Button color="brand" size="m" outline css={moreBtn}>
      클럽 모두 보러가기
    </Button>
  );
}

export default index;
