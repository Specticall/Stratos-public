import { PrismaClient } from "@prisma/client";
import { AppError } from "./AppError";

type FillableUserForm = {
  username: string;
  password: string;
  email: string;
  tag?: string;
  location?: string;
  aboutMe?: string;
};

export async function createUser(prisma: PrismaClient, data: FillableUserForm) {
  const userExist = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (userExist)
    throw new AppError(`User with the email ${data.email} already exists`, 400);

  return await prisma.user.create({
    data: {
      username: data.username,
      password: data.password,
      email: data.email,
      tag: data?.tag || data.username,
      location: data?.location,
      aboutMe: data?.aboutMe,
      profilePicture: "",
      dateCreated: new Date(),
      followers: 0,
      following: 0,
    },
  });
}
