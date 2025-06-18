import React from "react";
import { useNavigate } from "react-router-dom";

const HomeButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-6 text-center">
      <button
        onClick={() => navigate("/")}
        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        ホームに戻る
      </button>
    </div>
  );
};

export default HomeButton;
