
import React from "react";
import { Link } from "react-router-dom";
import { User, BarChart3, Camera, FileText } from "lucide-react";

interface NavigationProps {
  role: "farmer" | "buyer";
}

const Navigation: React.FC<NavigationProps> = ({ role }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="container mx-auto">
        <div className="flex justify-around items-center py-2">
          <Link 
            to="/dashboard" 
            className="flex flex-col items-center p-2 text-agri-primary"
          >
            <BarChart3 size={24} />
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
          
          <Link 
            to="/transactions" 
            className="flex flex-col items-center p-2 text-agri-text"
          >
            <FileText size={24} />
            <span className="text-xs mt-1">Transactions</span>
          </Link>
          
          {role === "farmer" && (
            <Link 
              to="/scanner" 
              className="flex flex-col items-center p-2 text-agri-text"
            >
              <Camera size={24} />
              <span className="text-xs mt-1">Scanner</span>
            </Link>
          )}
          
          <Link 
            to="/profile" 
            className="flex flex-col items-center p-2 text-agri-text"
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
