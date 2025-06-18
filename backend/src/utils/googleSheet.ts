import { google } from "googleapis";
import { JWT } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const spreadsheetId = process.env.SPREADSHEET_ID;

if (!spreadsheetId) {
  console.error("❌ SPREADSHEET_ID が .env に設定されていません。");
  throw new Error("SPREADSHEET_ID is not set in environment variables");
}

const auth = new JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });

/**
 * データを指定シートに追加
 * @param sheetName - 対象のシート名
 * @param values - 2次元配列の値（[[a,b,c]] 形式）
 */
export const appendToSheet = async (sheetName: string, values: string[][]) => {
  try {
    const res = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });
    return res.data;
  } catch (error) {
    console.error("❌ Google Sheets への書き込み失敗:", error);
    throw error;
  }
};

/**
 * 指定シートの値を取得
 * @param sheetName - 対象のシート名
 */
export const getSheetValues = async (sheetName: string) => {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}`,
    });
    return res.data.values || [];
  } catch (error) {
    console.error("❌ Google Sheets 読み取り失敗:", error);
    throw error;
  }
};
