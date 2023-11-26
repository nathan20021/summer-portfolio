/* eslint-disable require-jsdoc */
import { deleteFileFromS3 } from "@/lib/aws-lib";
import { NextApiRequest, NextApiResponse } from "next";

export default async function CreateNewBlog(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { bucketName, fileName },
    method,
  } = req;

  switch (method) {
    case "DELETE":
      const s3Response = await deleteFileFromS3(bucketName, fileName);
      res.status(200).json({ s3Response });
      break;
    default:
      res.status(403).end("Method not allowed");
  }
}
