import express from "express";
import fetch from "node-fetch";
import FormData from "form-data";

export const activateEsimRouter = express.Router();

async function activateEsim(payload: any) {
  if (!payload.authKey) {
    throw new Error("authKey is missing on server.");
  }

  const form = new FormData();
  form.append("json", JSON.stringify(payload));

  const response = await fetch("https://i1.mvno.net/emptool/api/mvno/esim/addAcnt/", {
    method: "POST",
    headers: form.getHeaders(),
    body: form as any,
  });

  const result = await response.json();

  if (result.resultCode !== "100") {
    console.error("FreeBit 認証失敗:", result);
    throw new Error("FreeBitからeSIM開通リクエストが拒否されました。");
  }

  return result;
}

activateEsimRouter.post("/", async (req, res) => {
  try {
    const result = await activateEsim(req.body);
    res.json(result);
  } catch (error: any) {
    console.error("eSIM開通エラー:", error);
    res.status(500).json({ error: error.message || "eSIM開通中にエラーが発生しました。" });
  }
});
