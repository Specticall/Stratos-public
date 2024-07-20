import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../helper/AppError";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { S3 } from "../../app";

// const client = new S3Client(clientParams);

// const url = await getSignedUrl(client, command, { expiresIn: 3600 });

const prisma = new PrismaClient();

export const getUser: RequestHandler = async (request, response, next) => {
  try {
    const userId = response.locals.userId as string;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user)
      throw new AppError(`User with the id ${userId} does not exist`, 404);

    // Modify bannerURL (which stores the s3 key) and converts them into a signed URL (a url that can be accesssed by users since our s3 only allows certain users.)
    const bannerName = user?.bannerURL;
    if (bannerName) {
      const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: bannerName,
      });
      user.bannerURL = await getSignedUrl(S3, command, { expiresIn: 10 });
    }

    if (!user)
      throw new AppError(`User with the id of ${userId}, does not exist`, 404);

    response.send(user);
  } catch (error) {
    next(error);
  }
};
