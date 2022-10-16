/* eslint-disable require-jsdoc */
import type { NextApiRequest, NextApiResponse } from "next";
import { usersRepo } from "../../helpers/usersHelper";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(usersRepo.getAll());
}
