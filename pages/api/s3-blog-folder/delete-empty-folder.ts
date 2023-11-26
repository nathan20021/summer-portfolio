/* eslint-disable require-jsdoc */
import { deleteFolder, getS3ObjectsAsJson } from "@/lib/aws-lib";
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
    case "DELETE":
      const objects = await getS3ObjectsAsJson(bucketName, folderName);
      if (objects && objects.length > 1) {
        console.log(objects);
        res.status(403).end("Folder not empty");
        return;
      }
      const s3Response = await deleteFolder(bucketName, folderName);
      res.status(200).json({ s3Response });
      break;
    default:
      res.status(403).end("Method not allowed");
  }
}
