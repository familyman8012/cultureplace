import InfinityCards from "@src/components/views/InfinityCards";
import { useRouter } from "next/router";

function Oneday() {
  const router = useRouter();
  const { genre } = router.query;
  console.log("genre", genre);
  return <>{genre && <InfinityCards querykey={String(genre)} />}</>;
}

export default Oneday;
