/* eslint-disable require-jsdoc */
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = _req;
  switch (method) {
    case "GET":
      const stats = await prisma.blogPost.findMany({});
      let total = 0;
      stats.forEach((val) => {
        total += val.views;
      });
      res.status(200).json({ data: { stats: stats, totalViews: total } });
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
