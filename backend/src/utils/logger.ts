// backend/src/utils/logger.ts

import fs from 'fs';
import path from 'path';
import { Request } from 'express';

/**
 * ログを出力する関数
 * @param level エラーレベル（error, warn, info など）
 * @param message ログメッセージ
 * @param req リクエスト情報（任意）
 */
export const logError = (
  level: 'error' | 'warn' | 'info',
  message: string,
  req?: Request
) => {
  const timestamp = new Date().toISOString();
  const log = {
    timestamp,
    level,
    message,
    method: req?.method,
    url: req?.originalUrl,
    ip: req?.ip,
    body: req?.body,
    query: req?.query,
    headers: req?.headers,
  };

  const logDir = path.join(__dirname, '../../logs');
  const logFile = path.join(logDir, `${level}.log`);

  // ログディレクトリがなければ作成
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  // ログファイルに追記
  fs.appendFile(
    logFile,
    JSON.stringify(log, null, 2) + '\n',
    (err) => {
      if (err) {
        console.error('ログファイルへの書き込みに失敗しました:', err);
      }
    }
  );

  // コンソール出力も行う（開発中）
  if (process.env.NODE_ENV !== 'production') {
    console[level === 'error' ? 'error' : 'log'](`[${level.toUpperCase()}]`, log);
  }
};
