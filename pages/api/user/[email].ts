/* eslint-disable require-jsdoc */
import { NextApiRequest, NextApiResponse } from "next";
import { usersRepo } from "../../../helpers/usersHelper";

const isValidEmail = (email: string) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
};

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
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
        if (usersRepo.find(email) === undefined) {
          usersRepo.create(email);
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
