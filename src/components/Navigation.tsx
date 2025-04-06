
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { User, BarChart3, Camera, FileText, Home } from "lucide-react";

interface NavigationProps {
  role: "farmer" | "buyer";
}

const Navigation: React.FC<NavigationProps> = ({ role }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="container mx-auto">
        <div className="flex justify-around items-center py-2">
          <Link 
            to="/dashboard" 
            className={`flex flex-col items-center p-2 ${currentPath === "/dashboard" ? "text-indigo-600" : "text-gray-500"}`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link 
            to="/transactions" 
            className={`flex flex-col items-center p-2 ${currentPath === "/transactions" ? "text-indigo-600" : "text-gray-500"}`}
          >
            <FileText size={24} />
            <span className="text-xs mt-1">Transactions</span>
          </Link>
          
          {role === "farmer" && (
            <Link 
              to="/scanner" 
              className={`flex flex-col items-center p-2 ${currentPath === "/scanner" ? "text-indigo-600" : "text-gray-500"}`}
            >
              <div className="w-14 h-14 rounded-full border-2 border-gray-300 flex items-center justify-center -mt-8 bg-white">
                <Camera size={26} className="text-gray-700" />
              </div>
              <span className="text-xs mt-1 invisible">Scanner</span>
            </Link>
          )}
          
          <Link 
            to="/profile" 
            className={`flex flex-col items-center p-2 ${currentPath === "/profile" ? "text-indigo-600" : "text-gray-500"}`}
          >
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
