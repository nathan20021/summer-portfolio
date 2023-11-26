/* eslint-disable require-jsdoc */
import { generateUploadPreSignedUrl } from "@/lib/aws-lib";
import { NextApiRequest, NextApiResponse } from "next";

export default async function CreateNewBlog(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { bucketName, fileName },
    method,
  } = req;

  switch (method) {
    case "GET":
      const s3Response = await generateUploadPreSignedUrl(
        bucketName as string,
        fileName as string
      );
      res.status(200).json({ s3Response });
      break;
    default:
      res.status(403).end("Method not allowed");
  }
}
