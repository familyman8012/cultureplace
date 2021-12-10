import axios from "axios";
import dayjs from "dayjs";
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
  useState
} from "react";
import ReactS3Client from "react-aws-s3-typescript";
import { UploadResponse } from "react-aws-s3-typescript/dist/types";

const useImgUp = (
  path = "content"
): [
  string,
  Dispatch<SetStateAction<string>>,
  ChangeEventHandler<HTMLInputElement>
] => {
  const [data, setData] = useState("");
  const handler = useCallback(async e => {
    const file = e.target.files[0];
    const nowDate = dayjs(Date.now()).format("YYMMDDHHMM");
    const fileName = `${nowDate}_${file?.name.replace(
      /(.png|.jpg|.jpeg|.gif)$/,
      ""
    )}`;

    const s3Config = {
      bucketName: "cultureplace",
      dirName: String(path),
      region: "ap-northeast-2",
      accessKeyId: String(process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID),
      secretAccessKey: String(process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY)
    };

    const s3 = new ReactS3Client(s3Config);

    try {
      const res = await s3.uploadFile(file, fileName);

      setData(res.location);
      console.log("type of img", typeof res.location, res.location);
    } catch (exception) {
      setData(String(exception));
    }
  }, []);
  return [data, setData, handler];
};

export default useImgUp;
