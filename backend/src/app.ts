import express, { NextFunction, Request, Response } from "express";
require("dotenv").config();
import morgan from "morgan";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import TestRouter from "./routes/testRoute";
import AuthRouter from "./routes/authRoute";
import GameRouter from "./routes/gameRoute";

const port = process.env.PORT;
const app = express();

// Middleware
// Body Parser
app.use(express.json({ limit: "10kb" }));

// Logger
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Cors
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

// Prisma client
export const prismaClient = new PrismaClient({
  log: ["query"],
});

// Routes
app.use("/api", TestRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/game", GameRouter);

// UnKnown Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`);
});
