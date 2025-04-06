
import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center mb-4">
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 w-16 h-16 bg-indigo-600 rounded-full opacity-100"></div>
        <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-300 rounded-full opacity-70"></div>
      </div>
    </div>
  );
};

export default Logo;
