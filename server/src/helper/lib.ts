import crypto from "crypto";

export function getRandomString(length = 32) {
  return crypto.randomBytes(length).toString("hex");
}
