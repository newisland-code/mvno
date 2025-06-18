import fetch from "node-fetch";
import { Request, Response } from "express";

export const authAcnt = async (req: Request, res: Response) => {
  const { authKey, account, password } = req.body;

  if (!authKey || !account || !password) {
    return res
      .status(400)
      .json({ error: "authKey, account, password は必須です。" });
  }

  const url = "https://api.freebit.com/v1/master/authAcnt/";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authKey}`,
  };

  const body = JSON.stringify({ account, password });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("アカウント認証エラー:", error);
    return res.status(500).json({ error: "アカウント認証に失敗しました。" });
  }
};
