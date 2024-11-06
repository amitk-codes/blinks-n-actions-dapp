import { Request, Response } from "express";

export const healthController = async (_req: Request, res: Response) => {
  res.status(200).send({ message: "API is healthy" });
};
