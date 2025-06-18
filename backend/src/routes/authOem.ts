// backend/src/routes/authOem.ts
import express from "express";
import fetch from "node-fetch";
import FormData from "form-data";

const router = express.Router();

router.post("/", async (req, res) => {
  const { oemId, oemKey } = req.body; // ← ここを "oemPassword" → "oemKey" に修正

  if (!oemId || !oemKey) {
    return res.status(400).json({ error: "OEM ID と KEY が必要です。" });
  }

  const form = new FormData();
  form.append("json", JSON.stringify({ oemId, oemKey }));

  try {
    const response = await fetch("https://i1.mvno.net/emptool/api/authOem/", {
      method: "POST",
      headers: form.getHeaders(),
      body: form as any,
    });

    const result = await response.text();

    const json = JSON.parse(result);

    if (json.resultCode !== "100") {
      console.error("FreeBit認証失敗:", json);
      return res.status(401).json({ error: "OEM認証に失敗しました", details: json });
    }

    res.json({ authKey: json.authKey });
  } catch (err: any) {
    console.error("OEM認証エラー:", err);
    res.status(500).json({ error: "サーバーエラーが発生しました", message: err.message });
  }
});

export default router;
