import React from "react";
import { CancelEsimForm } from "../components/forms/CancelEsimForm";

const CancelEsimPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">PA05-43: eSIMキャンセル</h1>
      <CancelEsimForm />
    </div>
  );
};

export default CancelEsimPage;
