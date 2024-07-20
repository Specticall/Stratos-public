import { RequestHandler } from "express";
import { extractRequestBody } from "../../helper/extractRequestBody";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../helper/AppError";
import { createUser } from "../../helper/createUser";
import bcrypt from "bcrypt";
import { createJWT } from "../../helper/createJWT";

const prisma = new PrismaClient();

export const register: RequestHandler = async (request, response, next) => {
  try {
    const { username, password, email } = extractRequestBody(
      request,
      "username",
      "password",
      "email"
    );

    const emailAlreadyExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (emailAlreadyExists)
      throw new AppError("This email is already registered", 400);

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await createUser(prisma, {
      email,
      username,
      password: hashedPassword,
    });

    const token = createJWT({ userId: newUser.id });

    response.status(200).send({
      token,
      userId: newUser.id,
    });
  } catch (error) {
    next(error);
  }
};
