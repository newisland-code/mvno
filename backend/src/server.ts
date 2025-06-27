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

// .env 読み込み
dotenv.config();

const startServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 3000; // ★ Koyeb が自動で設定

  // ミドルウェア
  app.use(cors());
  app.use(express.json());
  app.use(logger);

  // ルーター
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

  // エラーハンドラ（最後）
  app.use(errorHandler);

  // ヘルスチェック
  app.get("/", (_, res) => {
    res.send("FreeBit API Gateway is running.");
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
};

startServer();
