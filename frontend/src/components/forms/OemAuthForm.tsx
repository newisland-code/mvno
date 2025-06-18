// frontend/src/components/forms/OemAuthForm.tsx
import React, { useState } from "react";
import { postToApi } from "@/services/apiClient";

const OemAuthForm: React.FC = () => {
  const [oemId, setOemId] = useState("");
  const [oemKey, setOemKey] = useState("");
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [authKey, setAuthKey] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResultMessage(null);
    setError(null);
    setAuthKey(null);

    try {
      const response = await postToApi("/authOem", { oemId, oemKey });
      setAuthKey(response.authKey);
      setResultMessage("✅ 認証成功しました。下記の authKey をコピーしてください。");
    } catch (err: any) {
      console.error("OEM認証エラー:", err);
      setError("❌ 認証に失敗しました。ID・KEYが正しいか確認してください。");
    }
  };

  const handleCopy = () => {
    if (authKey) {
      navigator.clipboard.writeText(authKey);
      alert("authKey をコピーしました。");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">OEM認証</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">OEM ID</label>
          <input
            type="text"
            value={oemId}
            onChange={(e) => setOemId(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">OEM KEY</label>
          <input
            type="password"
            value={oemKey}
            onChange={(e) => setOemKey(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          認証
        </button>
      </form>

      {/* 成功メッセージ */}
      {resultMessage && (
        <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded text-green-700">
          <p>{resultMessage}</p>
          <div className="mt-2 flex items-center justify-between">
            <p className="break-all text-sm"><strong>authKey:</strong> {authKey}</p>
            <button
              onClick={handleCopy}
              className="ml-2 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
            >
              コピー
            </button>
          </div>
        </div>
      )}

      {/* エラーメッセージ */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded text-red-700">
          {error}
        </div>
      )}
    </div>
  );
};

export default OemAuthForm;