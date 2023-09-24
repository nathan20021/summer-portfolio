/* eslint-disable require-jsdoc */
import config from "@/config.json";
import { prisma } from "@/db";
import { randomUUID } from "crypto";
import { uploadFileToS3 } from "@/lib/aws-lib";
import { NextApiRequest, NextApiResponse } from "next";

export default async function CreateNewBlog(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      const defaultPost = "#\n\n## New Untitled Post";
      const id = randomUUID({
        disableEntropyCache: true,
      });
      const blog = await prisma.blogPost.create({
        data: {
          id: id,
          readTime: 1,
          cover: "",
          description: "",
          title: "Untitled",
          views: 1,
          url: "",
          featured: false,
        },
      });
      await uploadFileToS3(config.S3_BUCKET, `${id}.md`, defaultPost);
      res.status(200).json({ body: blog });
      break;
    default:
      res.status(403).end("Method not allowed");
  }
}
