// backend/src/utils/oemAuthHandler.ts
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export async function autoAuthenticateOem(): Promise<void> {
  const oemId = process.env.OEM_ID;
  const oemKey = process.env.OEM_KEY;

  if (!oemId || !oemKey) {
    console.error('OEM_ID または OEM_KEY が .env に設定されていません');
    return;
  }

  const formData = new URLSearchParams();
  formData.append('oemId', oemId);
  formData.append('oemKey', oemKey);

  try {
    const res = await fetch('https://api.freebit.com/authOem/', {
      method: 'POST',
      body: formData,
    });

    const text = await res.text();
    const match = text.match(/<authKey>(.*?)<\/authKey>/);
    const authKey = match?.[1];

    if (!authKey) {
      console.error('authKey の取得に失敗しました');
      return;
    }

    const envPath = path.resolve(__dirname, '../../.env');
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const updatedEnv = envContent.replace(/AUTH_KEY=.*/g, `AUTH_KEY=${authKey}`);

    fs.writeFileSync(envPath, updatedEnv);
    console.log('✅ authKey を自動取得し .env に保存しました');
  } catch (error) {
    console.error('OEM認証中にエラーが発生しました:', error);
  }
}
