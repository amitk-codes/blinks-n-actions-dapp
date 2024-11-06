import dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import healthRoutes from "./routes/health.route";
import choiceRoutes from "./routes/choice.route";
import { actionCorsMiddleware } from "@solana/actions";

const app = express();

app.use(actionCorsMiddleware({}));

app.use("/health", healthRoutes);
app.use("/choice", choiceRoutes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "SERVER ERROR" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`app is running at port: ${PORT}`));
