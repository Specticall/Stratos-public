import { PrismaClient } from "@prisma/client";
import { createUser } from "../helper/createUser";

const prisma = new PrismaClient();

createUser(prisma, {
  email: "josephyusmita@gmail.com",
  password: "password",
  username: "Joseph Yusmita",
  tag: "@notjoseph",
}).then(() => console.log("User created"));
