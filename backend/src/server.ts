// backend/src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authOemRouter from "./routes/authOem";
import addAcntRouter from "./routes/addAcnt";
import authAcntRouter from "./routes/authAcnt";
import { activateEsimRouter } from "./routes/activateEsim";
import reissueEsimRouter from "./routes/reissueEsim";
import cancelEsimRouter from "./routes/cancelEsim";
import suspendLineRouter from "./routes/suspendLine";
import resumeLineRouter from "./routes/resumeLine";
import terminateLineRouter from "./routes/terminateLine";
import inquiryStatusRouter from "./routes/inquiryStatus";
import statusCheckRouter from "./routes/statusCheck";

import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logger";

// .envの初期読み込み
dotenv.config();

// サーバー初期化関数
const startServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(cors());
  app.use(express.json());

  // アクセスログ（最初に）
  app.use(logger);

  // 各APIルーター
  app.use("/authOem", authOemRouter);
  app.use("/addAcnt", addAcntRouter);
  app.use("/authAcnt", authAcntRouter);
  app.use("/activateEsim", activateEsimRouter);
  app.use("/reissueEsim", reissueEsimRouter);
  app.use("/cancelEsim", cancelEsimRouter);
  app.use("/suspendLine", suspendLineRouter);
  app.use("/resumeLine", resumeLineRouter);
  app.use("/terminateLine", terminateLineRouter);
  app.use("/inquiryStatus", inquiryStatusRouter);
  app.use("/status", statusCheckRouter);

  // エラーハンドリング（最後に）
  app.use(errorHandler);

  // ヘルスチェック
  app.get("/", (_, res) => {
    res.send("FreeBit API Gateway is running.");
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
};

startServer();