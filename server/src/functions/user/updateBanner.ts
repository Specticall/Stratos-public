import { PutObjectCommand } from "@aws-sdk/client-s3";
import { RequestHandler } from "express";

import { AppError } from "../../helper/AppError";
import { getRandomString } from "../../helper/lib";
import { PrismaClient } from "@prisma/client";
import { S3 } from "../../app";

const bucketName = process.env.BUCKET_NAME as string;
export const bucketRegion = process.env.BUCKET_REGION as string;
export const bucketSecretKey = process.env.BUCKET_SECRET_KEY as string;
export const bucketAcessKey = process.env.BUCKET_ACCESS_KEY as string;

const prisma = new PrismaClient();

export const updateBanner: RequestHandler = async (request, response, next) => {
  try {
    const userId = response.locals.userId as string;

    const imageBuffer = request.file?.buffer;
    if (!imageBuffer) throw new AppError("Image buffer does not exist", 500);

    const userData = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        bannerURL: true,
      },
    });

    // Only create a new name if banner does not exist in the first place.
    let bannerName = userData?.bannerURL;
    if (!bannerName) {
      bannerName = getRandomString();
    }

    const command = new PutObjectCommand({
      Bucket: bucketName,
      // This needs to be unique so S3 does not override same named image
      // Key: request.file!.originalname,
      Key: bannerName,
      Body: request!.file?.buffer,
      ContentType: request!.file?.mimetype,
    });

    await S3.send(command);

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        bannerURL: bannerName,
      },
    });

    response.send({
      message: "Successfuly saved image",
    });
  } catch (error) {
    next(error);
  }
};
