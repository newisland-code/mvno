// frontend/src/pages/ActivateEsimPage.tsx
import React from "react";
import ActivateEsimForm from "../components/forms/ActivateEsimForm";
import { Link } from "react-router-dom";

const ActivateEsimPage = () => {
  return (
    <div className="p-6 space-y-6">
      <ActivateEsimForm />
      <Link to="/" className="text-blue-600 underline">ホームに戻る</Link>
    </div>
  );
};

export default ActivateEsimPage;