import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { prismaClient } from "../app";
import AppError from "../appError";

let jwtSecret = process.env.JWT_SECRET as string;

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let access_token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      access_token = req.headers.authorization.split(" ")[1] as any;
    }

    if (!access_token) {
      return next(new AppError("You are not logged in", 401));
    }
    const payload = jwt.verify(access_token, jwtSecret) as any;
    const user = (await prismaClient.user.findFirst({
      where: { id: payload.doctorId },
    })) as any;
    if (!user)
      return next(new AppError(`User with that token no longer exist`, 401));
    res.locals.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
