import React, { useState } from "react";
import { postToApi } from "@/services/apiClient";
import { planOptions } from "@/types/planOptions";

const simKindOptions = [
  { label: "データ専用 (SMSなし)", value: "E2" },
  { label: "データ専用 (SMSあり)", value: "E3" },
  { label: "音声SIM", value: "E0" },
];

const addKindOptions = [
  { label: "新規開通", value: "N" },
  { label: "MNP転入", value: "M" },
  { label: "再発行", value: "R" },
];

const createTypeOptions = [
  { label: "新規作成 (new)", value: "new" },
  { label: "既存に追加 (add)", value: "add" },
];

const aladinOperatedOptions = [
  { label: "未操作 (20)", value: "20" },
  { label: "操作済み (10)", value: "10" },
];

const contractLineOptions = [
  { label: "4G", value: "4G" },
  { label: "5G", value: "5G" },
];

const genderOptions = [
  { label: "男性", value: "M" },
  { label: "女性", value: "W" },
  { label: "法人", value: "C" },
];

const ActivateEsimForm: React.FC = () => {
  const [authKey, setAuthKey] = useState("");
  const [aladinOperated, setAladinOperated] = useState("20");
  const [createType, setCreateType] = useState("new");
  const [eid, setEid] = useState("");
  const [account, setAccount] = useState("");
  const [repAccount, setRepAccount] = useState("");
  const [simKind, setSimKind] = useState("E2");
  const [contractLine, setContractLine] = useState("4G");
  const [addKind, setAddKind] = useState("N");
  const [shipDate, setShipDate] = useState("");
  const [planCode, setPlanCode] = useState("");
  const [reserveNumber, setReserveNumber] = useState("");
  const [lastnameKanji, setLastnameKanji] = useState("");
  const [firstnameKanji, setFirstnameKanji] = useState("");
  const [lastnameZenKana, setLastnameZenKana] = useState("");
  const [firstnameZenKana, setFirstnameZenKana] = useState("");
  const [gender, setGender] = useState("M");
  const [birthday, setBirthday] = useState("");
  const [oldProductNumber, setOldProductNumber] = useState("");
  const [oldEid, setOldEid] = useState("");
  const [masterAccount, setMasterAccount] = useState("");
  const [masterPassword, setMasterPassword] = useState("");
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResultMessage(null);
    setError(null);

    const payload: any = {
      authKey,
      aladinOperated,
      createType,
      eid,
      planCode,
      addKind,
    };

    if (aladinOperated === "10") payload.shipDate = shipDate;
    if (createType === "new") payload.masterPassword = masterPassword;
    if (masterAccount) payload.masterAccount = masterAccount;
    if (!(aladinOperated === "20" && addKind === "N")) payload.account = account.replace(/-/g, "");
    if (addKind !== "R") payload.simKind = simKind;
    if (contractLine) payload.contractLine = contractLine;
    if (addKind === "N" && aladinOperated === "10") payload.repAccount = repAccount;

    if (addKind === "R") {
      payload.reissue = {
        oldProductNumber,
        oldEid,
      };
    }

    if (addKind === "M") {
      payload.mnp = {
        reserveNumber,
        lastnameKanji,
        firstnameKanji,
        lastnameZenKana,
        firstnameZenKana,
        gender,
        birthday,
      };
    }

    try {
      await postToApi("/activateEsim", payload);
      setResultMessage("✅ 開通リクエストが正常に送信されました。");
    } catch (err: any) {
      console.error("❌ エラー発生:", err);
      setError("❌ 開通に失敗しました。内容を確認してください。");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">PA04-01: eSIM開通</h2>
      <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="authKey" value={authKey} setValue={setAuthKey} required />
        <Select label="aladinOperated" value={aladinOperated} setValue={setAladinOperated} options={aladinOperatedOptions} />
        <Select label="createType" value={createType} setValue={setCreateType} options={createTypeOptions} />
        <Input label="masterAccount" value={masterAccount} setValue={setMasterAccount} />
        <Input label="masterPassword" value={masterPassword} setValue={setMasterPassword} />
        <Input label="eid (32桁)" value={eid} setValue={setEid} required />
        <Input label="アカウント番号" value={account} setValue={setAccount} />
        <Input label="repAccount" value={repAccount} setValue={setRepAccount} />
        <Select label="SIM種別" value={simKind} setValue={setSimKind} options={simKindOptions} />
        <Select label="通信方式 (contractLine)" value={contractLine} setValue={setContractLine} options={contractLineOptions} />
        <Select label="追加種別" value={addKind} setValue={setAddKind} options={addKindOptions} />
        <Input label="出荷日 (YYYYMMDD)" value={shipDate} setValue={setShipDate} />
        <Select label="プランコード" value={planCode} setValue={setPlanCode} options={planOptions} />

        {addKind === "M" && (
          <>
            <Input label="MNP予約番号" value={reserveNumber} setValue={setReserveNumber} />
            <Input label="苗字（漢字）" value={lastnameKanji} setValue={setLastnameKanji} />
            <Input label="名前（漢字）" value={firstnameKanji} setValue={setFirstnameKanji} />
            <Input label="苗字（カナ）" value={lastnameZenKana} setValue={setLastnameZenKana} />
            <Input label="名前（カナ）" value={firstnameZenKana} setValue={setFirstnameZenKana} />
            <Select label="性別" value={gender} setValue={setGender} options={genderOptions} />
            <Input label="誕生日 (YYYYMMDD)" value={birthday} setValue={setBirthday} />
          </>
        )}

        {addKind === "R" && (
          <>
            <Input label="旧ProductNumber" value={oldProductNumber} setValue={setOldProductNumber} />
            <Input label="旧EID" value={oldEid} setValue={setOldEid} />
          </>
        )}

        <button type="submit" className="col-span-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          開通リクエスト送信
        </button>
      </form>
      {resultMessage && <div className="mt-4 p-3 bg-green-100 text-green-700">{resultMessage}</div>}
      {error && <div className="mt-4 p-3 bg-red-100 text-red-700">{error}</div>}
    </div>
  );
};

const Input = ({ label, value, setValue, required = false }: any) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full border rounded px-3 py-2"
      required={required}
    />
  </div>
);

const Select = ({ label, value, setValue, options }: any) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full border rounded px-3 py-2"
    >
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

export default ActivateEsimForm;
