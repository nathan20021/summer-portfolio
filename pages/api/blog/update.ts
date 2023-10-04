/* eslint-disable require-jsdoc */
import { NextApiRequest, NextApiResponse } from "next";
import { uploadFileToS3 } from "@/lib/aws-lib";
import config from "@/config.json";
import { prisma } from "@/db";

export default async function UpdateBlog(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      try {
        const uploadResponse = await uploadFileToS3(
          config.S3_BUCKET,
          `${body.id}.md`,
          body.content
        );
        await prisma.blogPost.update({
          where: {
            id: body.id,
          },
          data: {
            updatedAt: new Date(),
          },
        });
        res.status(200).json({ body: uploadResponse });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
      break;
    default:
      res.status(403).end("Method not allowed");
  }
}
