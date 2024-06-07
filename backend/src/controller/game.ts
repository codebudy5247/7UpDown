import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../app";

export const rollDice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { betAmount, betType } = req.body;
    const user = res.locals.user;

    if (betAmount > user.points) {
      throw new Error("You don't have enough point to play.");
    }

    // generate die numbers
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const total = die1 + die2;

    let winAmount = 0;

    // calculate win/loose amount
    if (total < 7 && betType === "7down") {
      winAmount = betAmount * 2;
    } else if (total === 7 && betType === "7") {
      winAmount = betAmount * 5;
    } else if (total > 7 && betType === "7up") {
      winAmount = betAmount * 2;
    } else {
      winAmount = -betAmount;
    }

    let totalPlayerPoints = user.points + winAmount;

    // update user points
    const updatedUserPoints = await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        points: totalPlayerPoints,
      },
    });

    let updatedUserPoint = updatedUserPoints.points;

    res.json({
      die1,
      die2,
      total,
      winAmount,
      updatedUserPoint,
    });
  } catch (error) {
    next(error);
  }
};
