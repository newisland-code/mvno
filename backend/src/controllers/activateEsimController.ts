// backend/src/controllers/activateEsim.ts
import fetch from "node-fetch";
import FormData from "form-data";
import { getAuthKey } from "./auth"; // 自動でauthKeyを取得

interface EsimActivationPayload {
  eid: string;
  simKind: string;
  addKind: "N" | "M" | "R";
  repAccount?: string;
  planCode?: string;
  deliveryCode?: string;
  account?: string;
  createType?: string;
  masterAccount?: string;
  masterPassword?: string;
  contractLine?: string;
  shipDate?: string;
  mnp?: {
    reserveNumber: string;
    reserveExpireDate?: string;
    lastnameKanji: string;
    firstnameKanji?: string;
    lastnameZenKana: string;
    firstnameZenKana?: string;
    gender: "M" | "W" | "C";
    birthday?: string;
  };
  reissue?: {
    oldProductNumber?: string;
    oldEid?: string;
  };
}

export async function activateEsim(inputPayload: EsimActivationPayload) {
  const authKey = await getAuthKey(); // 自動取得
  if (!authKey) throw new Error("authKeyを取得できませんでした。");

  const payload = {
    ...inputPayload,
    authKey,
    aladinOperated: "10", // デフォルト設定
  };

  const form = new FormData();
  form.append("json", JSON.stringify(payload));

  const response = await fetch("https://i1.mvno.net/emptool/api/mvno/esim/addAcnt/", {
    method: "POST",
    headers: form.getHeaders(),
    body: form as any,
  });

  const result = await response.json();

  if (result.resultCode !== "100") {
    console.error("FreeBit eSIM開通失敗:", result);
    throw new Error(result.status?.message || "eSIM開通リクエストが拒否されました");
  }

  return result;
}
