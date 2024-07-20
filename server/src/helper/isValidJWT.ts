import jwt from "jsonwebtoken";

export function isValidJWT(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string);
}
