import fetch from "node-fetch";
import { Request, Response } from "express";

interface EsimReissuePayload {
  authKey: string;
  eid: string;
  simKind: string;
  addKind: "R";
  reissue: {
    oldProductNumber?: string;
    oldEid?: string;
  };
}

export const reissueEsim = async (req: Request, res: Response) => {
  const {
    authKey,
    ...bodyData
  }: EsimReissuePayload = req.body;

  if (!authKey || !bodyData.eid || !bodyData.simKind || bodyData.addKind !== "R") {
    return res.status(400).json({
      error: "authKey, eid, simKind は必須です。addKind は 'R' に固定してください。",
    });
  }

  const url = "https://api.freebit.com/v1/mvno/esim/addAcnt/";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authKey}`,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("eSIM再発行エラー:", error);
    return res.status(500).json({ error: "eSIM再発行に失敗しました。" });
  }
};
