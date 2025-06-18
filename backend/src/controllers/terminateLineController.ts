import fetch from "node-fetch";
import { Request, Response } from "express";

interface TerminateLinePayload {
  authKey: string;
  eid: string;
  terminateDate?: string; // yyyyMMdd 任意
}

export const terminateLine = async (req: Request, res: Response) => {
  const {
    authKey,
    eid,
    terminateDate,
  }: TerminateLinePayload = req.body;

  if (!authKey || !eid) {
    return res.status(400).json({ error: "authKey と eid は必須です。" });
  }

  const url = "https://api.freebit.com/v1/mvno/line/terminate/";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authKey}`,
  };

  const payload = {
    eid,
    ...(terminateDate && { terminateDate }),
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
    console.error("契約解除エラー:", error);
    return res.status(500).json({ error: "契約解除に失敗しました。" });
  }
};
