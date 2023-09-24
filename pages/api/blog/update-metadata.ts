/* eslint-disable require-jsdoc */
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db";

export default async function UpdateBlog(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case "PATCH":
      try {
        const uploadResponse = await prisma.blogPost.update({
          where: { id: body.id },
          data: {
            ...(body.title && { title: body.title }),
            ...(body.description && { description: body.description }),
            ...(body.readTime && { readTime: parseInt(body.readTime) }),
            ...(body.views && { views: parseInt(body.views) }),
            ...(body.cover && { cover: body.cover }),
            ...(body.type && { type: body.type }),
            ...(body.bucketURL && { bucketURL: body.bucketURL }),
            ...(body.url && { url: body.url }),
            publishedAt: new Date(),
            updatedAt: new Date(),
          },
        });

        res.status(200).json({ body: uploadResponse });
      } catch (err: any) {
        err.name === "PrismaClientKnownRequestError"
          ? res.status(404).json({ error: err })
          : res.status(500).json({ error: err });
      }
      break;
    default:
      res.status(403).end("Method not allowed");
  }
}
