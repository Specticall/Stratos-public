import { RequestHandler } from "express";
import { extractRequestBody } from "../../helper/extractRequestBody";
import { AppError } from "../../helper/AppError";

import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { createJWT } from "../../helper/createJWT";

const prisma = new PrismaClient();

export const login: RequestHandler = async (request, response, next) => {
  try {
    const { email, password } = extractRequestBody(
      request,
      "email",
      "password"
    );

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) throw new AppError("This email is not registered", 400);

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new AppError("Incorrect password", 400);

    const token = createJWT({ userId: user.id });

    response.status(200).send({
      token,
      userId: user.id,
    });
  } catch (error) {
    next(error);
  }
};

// const bearerToken = request.headers.authorization;
// const token = bearerToken?.split(" ")[1];
// if (!token)
//   throw new AppError("Token was not found inside the request header", 400);

// if (!isValidJWT(token)) throw new AppError("Invalid token", 400);
