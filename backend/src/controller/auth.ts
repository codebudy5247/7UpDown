import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../app";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";

let jwtSecret = process.env.JWT_SECRET as string;

//Register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    let user = await prismaClient.user.findFirst({
      where: { email: email },
    });
    if (user) {
      throw new Error("User already exist!");
    }

    let newUser = await prismaClient.user.create({
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashSync(password, 10),
        points: 5000,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

//Login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    let user = await prismaClient.user.findFirst({
      where: { email: email },
    });
    if (!user) throw new Error("User not found");

    if (!compareSync(password, user.password))
      throw new Error("Incorrect password");

    const accessToken = jwt.sign(
      {
        doctorId: user.id,
      },
      jwtSecret
    );
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

//Profile
export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    res.json(user);
  } catch (error) {
    next(error);
  }
};
