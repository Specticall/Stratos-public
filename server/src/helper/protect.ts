import { RequestHandler } from "express";
import { AppError } from "./AppError";
import jwt from "jsonwebtoken";

export const protect: RequestHandler = (request, response, next) => {
  try {
    const token = request.headers.authorization as string;
    if (!token) throw new AppError("Missing Authorization Header", 400);

    const decodedToken = jwt.verify(token, process.env.JWT_STRING as string) as
      | {
          userId: string;
          iat: number;
          exp: number;
        }
      | undefined;

    if (!decodedToken) throw new AppError("Authorization failed", 400);

    response.locals.userId = decodedToken.userId;
    next();
  } catch (err) {
    next(err);
  }
};
