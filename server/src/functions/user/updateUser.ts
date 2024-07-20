import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../helper/AppError";

const prisma = new PrismaClient();

export const updateUser: RequestHandler = async (request, response, next) => {
  try {
    const userId = response.locals.userId as string;

    // These fields are optional, if they don't exist they will get ignore by the query
    const {
      username,
      email,
      location,
      aboutMe,
      profilePicture,
      followers,
      following,
    } = request.body;

    const emailAlreadyExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (email && emailAlreadyExist && emailAlreadyExist.id !== userId)
      throw new AppError(`Email ${email} already exist`, 400);

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
        email,
        location,
        aboutMe,
        profilePicture,
        followers,
        following,
      },
    });

    response.send(updatedUser);
  } catch (error) {
    next(error);
  }
};
