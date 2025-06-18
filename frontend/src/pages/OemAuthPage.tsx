// frontend/src/pages/OemAuthPage.tsx
import React from "react";
import OemAuthForm from "../components/forms/OemAuthForm";
import { Link } from "react-router-dom";

const OemAuthPage = () => {
  return (
    <div className="p-6 space-y-6">
      <OemAuthForm />
      <Link to="/" className="text-blue-600 underline">ホームに戻る</Link>
    </div>
  );
};

export default OemAuthPage;