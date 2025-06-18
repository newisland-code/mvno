// frontend/src/pages/AddAcntPage.tsx
import React from "react";
import AddAcntForm from "../components/forms/AddAcntForm";
import { Link } from "react-router-dom";

const AddAcntPage = () => {
  return (
    <div className="p-6 space-y-6">
      <AddAcntForm />
      <Link to="/" className="text-blue-600 underline">ホームに戻る</Link>
    </div>
  );
};

export default AddAcntPage;