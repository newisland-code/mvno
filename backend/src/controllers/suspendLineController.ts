import fetch from "node-fetch";
import { Request, Response } from "express";

interface SuspendLinePayload {
  authKey: string;
  eid: string;
  suspendDate?: string; // yyyyMMdd 任意
}

export const suspendLine = async (req: Request, res: Response) => {
  const {
    authKey,
    eid,
    suspendDate,
  }: SuspendLinePayload = req.body;

  if (!authKey || !eid) {
    return res.status(400).json({ error: "authKey と eid は必須です。" });
  }

  const url = "https://api.freebit.com/v1/mvno/line/suspend/";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authKey}`,
  };

  const payload = {
    eid,
    ...(suspendDate && { suspendDate }),
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("回線一時中断エラー:", error);
    return res.status(500).json({ error: "回線の一時中断に失敗しました。" });
  }
};
