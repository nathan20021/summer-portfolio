/* eslint-disable require-jsdoc */
import { NextApiRequest, NextApiResponse } from "next";
import { uploadFileToS3 } from "@/lib/aws-lib";
import cofig from "@/config.json";
import { randomUUID } from "crypto";
import { prisma } from "@/db";

export default async function FetchFolderStructure(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const body = req.body;

  switch (method) {
    case "POST":
      const defaultPost = "#\n ## Untitled Post";
      const id = randomUUID({
        disableEntropyCache: true,
      });
      const blog = await prisma.blogPost.create({
        data: {
          id: id,
          readTime: 1,
          cover: "",
          description: "",
          title: "",
          views: 1,
          featured: false,
        },
      });
      await uploadFileToS3(cofig.S3_BUCKET, `${id}.md`, defaultPost);
      res.status(200).json({ body: blog });
      break;
    default:
      res.status(403).end("Method not allowed");
  }
}
