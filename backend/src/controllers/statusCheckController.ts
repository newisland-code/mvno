import { Request, Response } from "express";

export const statusCheck = (_: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    message: "FreeBit API backend is live",
  });
};
