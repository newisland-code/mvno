// frontend/src/pages/LookupContractPage.tsx
import React from "react";
import LookupContractForm from "../components/forms/LookupContractForm";
import { Link } from "react-router-dom";

const LookupContractPage = () => {
  return (
    <div className="p-6 space-y-6">
      <LookupContractForm />
      <Link to="/" className="text-blue-600 underline">ホームに戻る</Link>
    </div>
  );
};

export default LookupContractPage;