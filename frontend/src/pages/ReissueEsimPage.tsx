import React from "react";
import { ReissueEsimForm } from "../components/forms/ReissueEsimForm";

const ReissueEsimPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">PA05-42: eSIM再発行</h1>
      <ReissueEsimForm />
    </div>
  );
};

export default ReissueEsimPage;
