import React from "react";
import { AuthAcntForm } from "../components/forms/AuthAcntForm";

const AuthAcntPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">PA03-01: アカウント認証</h1>
      <AuthAcntForm />
    </div>
  );
};

export default AuthAcntPage;
