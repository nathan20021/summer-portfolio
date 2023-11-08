/* eslint-disable require-jsdoc */
import config from "@/config.json";
import { createEmptyFolder } from "@/lib/aws-lib";
import { NextApiRequest, NextApiResponse } from "next";

export default async function CreateNewBlog(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      const res = await createEmptyFolder(config.S3_BUCKET, req.body.folderName);
      res.status(200).json({ message: "Hello World" });
      break;
    default:
      res.status(403).end("Method not allowed");
  }
}
