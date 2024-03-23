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
      const subs = await prisma.subscribers.findMany();
      res.status(200).json({ data: subs });
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
