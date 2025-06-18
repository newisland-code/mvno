import fetch from "node-fetch";
import FormData from "form-data";
import { Request, Response } from "express";

export const authOem = async (req: Request, res: Response) => {
  const { oemId, oemKey } = req.body;

  if (!oemId || !oemKey) {
    return res.status(400).json({ error: "oemIdとoemKeyは必須です。" });
  }

  const url = "https://i1.mvno.net/emptool/api/authOem/";

  const form = new FormData();
  form.append("json", JSON.stringify({ oemId, oemKey }));

  try {
    const response = await fetch(url, {
      method: "POST",
      body: form,
      headers: form.getHeaders(),
    });

    const text = await response.text();

    if (!response.ok) {
      return res.status(response.status).json({ error: text });
    }

    const data = JSON.parse(text);
    return res.status(200).json(data);
  } catch (err) {
    console.error("OEM認証エラー:", err);
    return res.status(500).json({ error: "OEM認証に失敗しました。" });
  }
};
