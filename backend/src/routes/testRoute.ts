import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

// Testing
router.get(
  "/healthChecker",
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: "success",
      message: "Api is running😂😂👈👈",
    });
  }
);


export default router;
