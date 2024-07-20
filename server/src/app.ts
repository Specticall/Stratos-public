import express from "express";
import cors from "cors";
import { AppError } from "./helper/AppError";
import { handleErrorDevelopment } from "./functions/error/errorHandler";
import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";
import { S3Client } from "@aws-sdk/client-s3";
import {
  bucketAcessKey,
  bucketSecretKey,
  bucketRegion,
} from "./functions/user/updateBanner";

export const S3 = new S3Client({
  credentials: {
    accessKeyId: bucketAcessKey,
    secretAccessKey: bucketSecretKey,
  },
  region: bucketRegion,
});

const app = express();

// Enable fetching from localhost
app.use(cors());

// Middle to parse body request
app.use(express.json());

app.use(async (req, res, next) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  next();
});

app.use("/user", userRouter);
app.use("/auth", authRouter);

// Handle invalid routes
app.use("*", (request, response, next) => {
  next(new AppError("The route you requested does not exist", 404));
});

app.use(handleErrorDevelopment);
export default app;
