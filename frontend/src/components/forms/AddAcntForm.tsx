import React, { useState } from "react";
import { postToApi } from "../../services/apiClient";

interface AddAcntRequest {
  authKey: string;
  masterAccount: string;
  masterPassword: string;
  relationCode: string;
  account: string;
  planCode: string;
}

interface AddAcntResponse {
  resultCode: string;
  resultMessage: string;
}

const planOptions = [
  { label: "音声通話SIM（3GB）", value: "LTE3G_P01" },
  { label: "音声通話SIM（10GB）", value: "LTE3G_P02" },
  { label: "データSIM（3GB）", value: "LTE3G_P03" },
  { label: "データSIM（10GB）", value: "LTE3G_P04" },
  // 必要に応じて追加
];

export const AddAcntForm: React.FC = () => {
  const [form, setForm] = useState<AddAcntRequest>({
    authKey: "",
    masterAccount: "",
    masterPassword: "",
    relationCode: "",
    account: "",
    planCode: "LTE3G_P01",
  });

  const [result, setResult] = useState<AddAcntResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await postToApi("/addAcnt", form);
      setResult(res);
    } catch (err: any) {
      setError(err.message || "APIエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-lg font-semibold mb-4">PA02-01 アカウント登録</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "認証キー（authKey）", name: "authKey" },
          { label: "管理者アカウント", name: "masterAccount" },
          { label: "管理者パスワード", name: "masterPassword", type: "password" },
          { label: "リレーションコード", name: "relationCode" },
          { label: "電話番号（account）", name: "account" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block font-medium">{label}</label>
            <input
              type={type || "text"}
              name={name}
              value={(form as any)[name]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        ))}

        <div>
          <label className="block font-medium">プランを選択</label>
          <select
            name="planCode"
            value={form.planCode}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            {planOptions.map((plan) => (
              <option key={plan.value} value={plan.value}>
                {plan.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "登録中..." : "送信"}
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

export default AddAcntForm;
