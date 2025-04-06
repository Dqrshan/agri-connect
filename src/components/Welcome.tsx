
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Welcome: React.FC = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  
  // Start animation after component mounts
  React.useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-between min-h-[80vh] py-10">
      <div 
        className={`text-center transform transition-all duration-1000 ${
          isAnimated ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <Logo />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome</h1>
        <p className="text-gray-500 text-lg mb-4">Placeholder text</p>
      </div>
      
      <div 
        className={`w-full max-w-xs transition-all duration-1000 delay-300 ${
          isAnimated ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="space-y-4">
          <Link to="/login">
            <button className="w-full py-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors">
              Log In
            </button>
          </Link>
          <Link to="/signup">
            <button className="w-full py-3 border border-indigo-500 text-indigo-500 rounded-full hover:bg-indigo-50 transition-colors">
              Sign up
            </button>
          </Link>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
      
      <div 
        className={`text-center mt-8 transition-all duration-1000 delay-600 ${
          isAnimated ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-agri-primary font-medium">
          Connecting Farmers and Buyers
        </p>
      </div>
    </div>
  );
};

export default Welcome;
