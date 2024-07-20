import { Request } from "express";
import { AppError } from "./AppError";

type ExtractedBody<T extends string[]> = {
  [K in T[number]]: string;
};

export function extractRequestBody<T extends string[]>(
  request: Request,
  ...values: T
): ExtractedBody<T> {
  const bodyValues = {} as ExtractedBody<T>;

  values.forEach((value) => {
    const extracted = request.body[value];
    if (!extracted) {
      throw new AppError(`"${value}" is missing in the request body`, 400);
    }

    if (typeof extracted !== "string")
      throw new AppError(
        `"${value}" inside the request body is not a string`,
        400
      );

    bodyValues[value as keyof ExtractedBody<T>] = extracted;
  });

  return bodyValues;
}
