/* eslint-disable require-jsdoc */
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db";

const isValidEmail = (email: string) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
};


export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { email },
    method,
  } = req;

  switch (method) {
    case "PUT":
      if (Array.isArray(email)) {
        res.status(400).json({ error: "Bad Request! One email only" });
        break;
      }
      if (email !== undefined && isValidEmail(email)) {
        // Check if user exists
        const userData = await prisma.subcribers.findFirst({
          where: {
            email: email,
          },
        });
        if (userData === null) {
          await prisma.subcribers.create({
            data: {
              email: email,
            },
          });
          res.status(200).json({ message: "User Added" });
          break;
        }
        res.status(200).json({ message: "User found" });
        break;
      }
      res.status(400).json({ error: "Email not valid" });
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
