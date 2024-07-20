import jwt from "jsonwebtoken";

export function createJWT(payload: { userId: string }) {
  return jwt.sign(payload, process.env.JWT_STRING as string, {
    expiresIn: "1d",
  });
}
