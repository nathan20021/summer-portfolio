/* eslint-disable require-jsdoc */
import { createEmptyFolder } from "@/lib/aws-lib";
import { NextApiRequest, NextApiResponse } from "next";

export default async function CreateNewBlog(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { bucketName, folderName },
    method,
  } = req;

  switch (method) {
    case "POST":
      if (
        folderName === "" ||
        folderName.includes("//") ||
        folderName.includes("..")
      ) {
        res.status(403).end("Invalid folder name");
        return;
      }
      const s3Response = await createEmptyFolder(bucketName, folderName);
      res.status(200).json({ s3Response });
      break;
    default:
      res.status(403).end("Method not allowed");
  }
}
