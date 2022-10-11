/* eslint-disable require-jsdoc */
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import users from "../data/users.json";
import { User } from "../interfaces/index";

export const usersRepo = {
  getAll: () => users,
  getById: (id: number) =>
    (<User[]>users).find((x: User) => x.id.toString() === id.toString()),
  find: (email: string) =>
    (<User[]>users).find((item: User) => item.email.toString() === email),
  create,
};

function create(email: string) {
  const user: User = {
    id: 0,
    email: "",
    dateCreated: "",
    dateUpdated: "",
  };
  // generate new user id
  user.id = (<User[]>users).length
    ? Math.max(...users.map((x: User) => x.id)) + 1
    : 1;
  user.email = email;
  user.dateCreated = new Date().toISOString();
  user.dateUpdated = new Date().toISOString();
  (<Array<User>>users).push(user);
  saveData();
}

function saveData() {
  fs.writeFileSync("data/users.json", JSON.stringify(<any>users, null, 4));
}

export function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: "John Doe" });
}
