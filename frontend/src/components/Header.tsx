// frontend/src/components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-700 text-white p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-semibold">MVNO 管理コンソール</h1>
        <nav className="space-x-4 text-sm">
          <Link to="/oem-auth" className="hover:underline">OEM認証</Link>
          <Link to="/add-acnt" className="hover:underline">アカウント登録</Link>
          <Link to="/activate-esim" className="hover:underline">eSIM開通</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
