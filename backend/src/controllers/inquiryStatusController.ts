import fetch from "node-fetch";
import { Request, Response } from "express";

interface InquiryStatusPayload {
  authKey: string;
  eid: string;
}

export const inquiryStatus = async (req: Request, res: Response) => {
  const { authKey, eid }: InquiryStatusPayload = req.body;

  if (!authKey || !eid) {
    return res.status(400).json({ error: "authKey と eid は必須です。" });
  }

  const url = "https://api.freebit.com/v1/mvno/esim/inquiry/";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authKey}`,
  };

  const payload = { eid };

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
    console.error("開通状況照会エラー:", error);
    return res.status(500).json({ error: "開通状況照会に失敗しました。" });
  }
};
