// frontend/src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-center text-xs text-gray-600 py-4 mt-8 border-t">
      © {new Date().getFullYear()} New Island Inc. All rights reserved.
    </footer>
  );
};

export default Footer;
