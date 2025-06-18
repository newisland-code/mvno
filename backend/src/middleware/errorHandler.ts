// backend/src/middleware/errorHandler.ts

import { Request, Response, NextFunction } from 'express';
import { logError } from '../utils/logger';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // logError の呼び出しを修正
  logError('error', message, req);

  res.status(status).json({
    success: false,
    errorCode: status,
    message: 'サーバーエラーが発生しました。運営にお問い合わせください。',
  });
};
