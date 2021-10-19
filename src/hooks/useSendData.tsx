import { useEffect, useState } from "react";

function useSendData(sendData: string) {
  const [data, setData] = useState("");

  useEffect(() => {
    setData(sendData);
  }, [sendData]);

  return data;
}

export default useSendData;
