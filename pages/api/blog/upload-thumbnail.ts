/* eslint-disable require-jsdoc */
import { NextApiRequest, NextApiResponse } from "next";
import appConfig from "@/config.json";
import axios from "axios";
import { uploadAttachmentToS3 } from "@/lib/aws-lib";

export default async function UpdateBlog(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      try {
        const response = await axios.get(body.dataURL, {
          responseType: "arraybuffer",
        });
        const buffer = Buffer.from(response.data, "base64");
        const uploadResponse = await uploadAttachmentToS3(
          appConfig.S3_THUMBNAIL_BUCKET,
          `${body.id}.jpeg`,
          "image/jpeg",
          buffer
        );
        res.status(200).json({ body: uploadResponse });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
      break;
    default:
      res.status(403).end("Method not allowed");
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Set desired value here
    },
  },
};
