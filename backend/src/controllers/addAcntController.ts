import { Request, Response } from "express";
import fetch from "node-fetch";

export const addAcnt = async (req: Request, res: Response) => {
  try {
    const {
      authKey,
      masterAccount,
      masterPassword,
      relationCode,
      account,
      planCode
    } = req.body;

    if (!authKey || !masterAccount || !masterPassword || !relationCode || !account || !planCode) {
      return res.status(400).json({ error: "すべての項目が必須です。" });
    }

    const payload = {
      authKey,
      createType: "new",
      masterAccount,
      masterPassword,
      relationCode,
      requestDatas: [
        {
          account,
          kind: "MVNO",
          planCode
        }
      ]
    };

    const response = await fetch("https://example-api.freebit.com/addAcnt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    res.status(response.status).json(result);
  } catch (error) {
    console.error("addAcnt error:", error);
    res.status(500).json({ error: "APIリクエストに失敗しました。" });
  }
};
