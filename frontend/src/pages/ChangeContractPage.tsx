// frontend/src/pages/ChangeContractPage.tsx
import React from "react";
import ChangeContractForm from "../components/forms/ChangeContractForm";
import { Link } from "react-router-dom";

const ChangeContractPage = () => {
  return (
    <div className="p-6 space-y-6">
      <ChangeContractForm />
      <Link to="/" className="text-blue-600 underline">ホームに戻る</Link>
    </div>
  );
};

export default ChangeContractPage;