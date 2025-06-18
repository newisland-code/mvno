import React, { useState } from "react";
import { postToApi } from "../../services/apiClient";

interface AuthAcntRequest {
  authKey: string;
  account: string;
  password: string;
}

interface AuthAcntResponse {
  resultCode: string;
  resultMessage: string;
}

export const AuthAcntForm: React.FC = () => {
  const [form, setForm] = useState<AuthAcntRequest>({
    authKey: "",
    account: "",
    password: "",
  });

  const [result, setResult] = useState<AuthAcntResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await postToApi("/authAcnt", form);
      setResult(res);
    } catch (err: any) {
      setError(err.message || "APIエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-lg font-semibold mb-4">PA03-01 アカウント認証</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["authKey", "account", "password"].map((field) => (
          <div key={field}>
            <label className="block font-medium">{field}</label>
            <input
              type="text"
              name={field}
              value={(form as any)[field]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "認証中..." : "送信"}
        </button>
      </form>

      {result && (
        <div className="mt-4 text-green-600">
          ✅ {result.resultMessage}（{result.resultCode}）
        </div>
      )}
      {error && <div className="mt-4 text-red-600">⚠️ エラー: {error}</div>}
    </div>
  );
};
