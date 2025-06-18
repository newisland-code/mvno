import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">ホーム画面へようこそ</h1>
        <p className="text-center mb-10 text-gray-600">各種申請メニューから必要な操作を選択してください。</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/oem-auth" className="block bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-xl text-center shadow-md">
            OEM認証
          </Link>
          <Link to="/add-account" className="block bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-xl text-center shadow-md">
            アカウント登録
          </Link>
          <Link to="/auth-account" className="block bg-indigo-500 hover:bg-indigo-600 text-white py-4 px-6 rounded-xl text-center shadow-md">
            アカウント認証
          </Link>
          <Link to="/activate-esim" className="block bg-purple-500 hover:bg-purple-600 text-white py-4 px-6 rounded-xl text-center shadow-md">
            eSIM開通
          </Link>
          <Link to="/reissue-esim" className="block bg-pink-500 hover:bg-pink-600 text-white py-4 px-6 rounded-xl text-center shadow-md">
            eSIM再発行
          </Link>
          <Link to="/cancel-esim" className="block bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-xl text-center shadow-md">
            eSIMキャンセル
          </Link>
          <Link to="/suspend-line" className="block bg-yellow-500 hover:bg-yellow-600 text-white py-4 px-6 rounded-xl text-center shadow-md">
            回線一時停止
          </Link>
          <Link to="/resume-line" className="block bg-emerald-500 hover:bg-emerald-600 text-white py-4 px-6 rounded-xl text-center shadow-md">
            回線再開
          </Link>
          <Link to="/terminate-line" className="block bg-gray-700 hover:bg-gray-800 text-white py-4 px-6 rounded-xl text-center shadow-md">
            回線解約
          </Link>
          <Link to="/lookup-contract" className="block bg-teal-500 hover:bg-teal-600 text-white py-4 px-6 rounded-xl text-center shadow-md">
            契約照会
          </Link>
          <Link to="/change-contract" className="block bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-xl text-center shadow-md">
            契約変更
          </Link>
          <Link to="/status-check" className="block bg-cyan-500 hover:bg-cyan-600 text-white py-4 px-6 rounded-xl text-center shadow-md">
            ステータスチェック
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
