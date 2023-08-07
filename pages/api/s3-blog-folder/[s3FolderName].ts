/* eslint-disable require-jsdoc */
import { NextApiRequest, NextApiResponse } from "next";
import { getS3ObjectsAsJson } from "@/lib/aws-lib";

export default async function FetchFolderStructure(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { s3FolderName },
    method,
  } = req;

  switch (method) {
    case "GET":
      res
        .status(200)
        .json(
          await getS3ObjectsAsJson("porfolio-blogs", s3FolderName as string)
        );
      break;
    default:
      res.status(403).end("Method not allowed");
  }
}
