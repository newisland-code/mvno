// frontend/src/components/layouts/PageLayout.tsx
import React from "react";
import HomeButton from "../common/HomeButton";

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {children}
      <HomeButton />
    </div>
  );
};

export default PageLayout;
