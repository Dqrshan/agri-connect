
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
        <div className="flex items-center justify-center mb-4">
          <div className="h-20 w-20 rounded-full bg-agri-primary flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-agri-primary mb-2">AgriConnect</h1>
        <p className="text-agri-secondary text-lg mb-4">Grow Smart. Connect Better.</p>
      </div>
      
      <div 
        className={`w-full max-w-xs transition-all duration-1000 delay-300 ${
          isAnimated ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-agri-text">Welcome to AgriConnect</h2>
            <p className="text-gray-600 mb-6">
              Connect with buyers, track market trends, and grow your agricultural business.
            </p>
            <div className="space-y-3">
              <Link to="/login">
                <button className="agri-button w-full flex justify-center items-center">
                  Login
                  <ArrowRight className="ml-2" size={18} />
                </button>
              </Link>
              <Link to="/signup">
                <button className="agri-button-outline w-full">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
          
          <p className="text-center text-sm text-gray-500">
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
