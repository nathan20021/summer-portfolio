/* eslint-disable require-jsdoc */
import { NextApiRequest, NextApiResponse } from "next";
import { getS3ObjectsAsJson } from "@/lib/aws-lib";
import { s3Element, recursiveFile } from "@/interfaces/backend";
import config from "../../../config.json";

function convertToRecursiveArray(flatList: s3Element[]): recursiveFile[] {
  const result: recursiveFile[] = [];

  flatList.forEach((item) => {
    item.Key = item.Key ? item.Key.replace(/\/$/, "") : "";
    const keys = item.Key ? item.Key.split("/") : [];
    let currentLevel = result;

    keys.forEach((key, index) => {
      const existingItem = currentLevel.find((child) => child.key === key);

      if (!existingItem) {
        const newItem: recursiveFile = {
          itemType: item.Size === 0 ? "folder" : "file",
          lastModified: item.LastModified,
          size: item.Size,
          key: key,
          ...(item.Size === 0 ? { children: [] } : {}),
        };

        currentLevel.push(newItem);
        currentLevel = newItem.children ? newItem.children : [];
      } else {
        currentLevel = existingItem.children ? existingItem.children : [];
      }

      if (index === keys.length - 1 && existingItem) {
        existingItem.lastModified = item.LastModified;
        existingItem.size = item.Size;
      }
    });
  });

  return result;
}

export default async function FetchFolderStructure(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { folderName },
    method,
  } = req;

  switch (method) {
    case "GET":
      const s3Response = await getS3ObjectsAsJson(
        config.S3_BUCKET,
        folderName as string
      );
      console.log(s3Response);
      res
        .status(200)
        .json(s3Response ? convertToRecursiveArray(s3Response) : null);
      break;
    default:
      res.status(403).end("Method not allowed");
  }
}
