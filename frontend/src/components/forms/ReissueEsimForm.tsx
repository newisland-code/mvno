import React, { useState } from "react";
import { postToApi } from "../../services/apiClient";

interface ReissueEsimRequest {
  authKey: string;
  eid: string;
  simKind: string;
  addKind: "R";
  reissue: {
    oldProductNumber?: string;
    oldEid?: string;
  };
}

interface ReissueEsimResponse {
  resultCode: string;
  resultMessage: string;
}

export const ReissueEsimForm: React.FC = () => {
  const [form, setForm] = useState<ReissueEsimRequest>({
    authKey: "",
    eid: "",
    simKind: "",
    addKind: "R",
    reissue: {
      oldProductNumber: "",
      oldEid: "",
    },
  });

  const [result, setResult] = useState<ReissueEsimResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "oldProductNumber" || name === "oldEid") {
      setForm((prev) => ({
        ...prev,
        reissue: {
          ...prev.reissue,
          [name]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await postToApi(
        "/reissueEsim",
        form
      );
      setResult(res);
    } catch (err: any) {
      setError(err.message || "APIエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-lg font-semibold mb-4">PA05-42 eSIM再発行</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["authKey", "eid", "simKind"].map((field) => (
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
        <div>
          <label className="block font-medium">旧ProductNumber</label>
          <input
            type="text"
            name="oldProductNumber"
            value={form.reissue.oldProductNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">旧EID</label>
          <input
            type="text"
            name="oldEid"
            value={form.reissue.oldEid}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "再発行中..." : "送信"}
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
