import fetch from "node-fetch";
import { Request, Response } from "express";

interface CancelEsimPayload {
  authKey: string;
  eid: string;
  cancelKind: "C1" | "C2";
  cancelDate?: string; // yyyyMMdd
}

export const cancelEsim = async (req: Request, res: Response) => {
  const {
    authKey,
    eid,
    cancelKind,
    cancelDate,
  }: CancelEsimPayload = req.body;

  if (!authKey || !eid || !cancelKind) {
    return res.status(400).json({
      error: "authKey, eid, cancelKind は必須です。",
    });
  }

  const url = "https://api.freebit.com/v1/mvno/esim/cancel/";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authKey}`,
  };

  const payload = {
    eid,
    cancelKind,
    ...(cancelDate && { cancelDate }),
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
    console.error("eSIMキャンセルエラー:", error);
    return res.status(500).json({ error: "eSIMキャンセルに失敗しました。" });
  }
};
