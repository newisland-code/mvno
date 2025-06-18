import { Request, Response, NextFunction } from "express";

export const injectAuthKey = (req: Request, res: Response, next: NextFunction) => {
  // authKeyはすべてフロントから手入力で受け取るため、ミドルウェアでは何も注入しない
  next();
};
