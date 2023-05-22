/* eslint-disable require-jsdoc */
import type { NextApiRequest, NextApiResponse } from "next";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import config from "@/config.json";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { blogID },
    method,
  } = _req;
  switch (method) {
    case "GET":
      const input = {
        Bucket: config.S3_BUCKET,
        Key: `${blogID}.md`,
      };
      const client = new S3Client({ region: config.AWS_REGION });
      const command = new GetObjectCommand(input);
      try {
        const response = await client.send(command);
        const bodyContents = await streamToString(response.Body);
        res.status(200).json({ data: bodyContents });
      } catch (err) {
        res.status(400).json({ error: err });
      }
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const streamToString = (stream: any) =>
  new Promise((resolve, reject) => {
    const chunks: Array<any> = [];
    stream.on("data", (chunk: any) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
