
import React from "react";
import { User, MapPin, Phone, Settings, LogOut } from "lucide-react";

interface ProfileProps {
  role: "farmer" | "buyer";
}

const ProfileSection: React.FC<ProfileProps> = ({ role }) => {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center bg-agri-card rounded-lg p-6 shadow-md">
        <div className="bg-agri-primary text-white w-16 h-16 rounded-full flex items-center justify-center mr-4">
          <span className="text-2xl font-medium">
            {role === "farmer" ? "R" : "A"}
          </span>
        </div>
        
        <div>
          <h1 className="text-xl font-semibold text-agri-text">
            {role === "farmer" ? "Rajesh Kumar" : "Ankit Sharma"}
          </h1>
          <p className="text-sm text-gray-500">{role === "farmer" ? "Farmer" : "Buyer"}</p>
        </div>
      </div>
      
      {/* Personal Details */}
      <div className="agri-card">
        <h2 className="text-lg font-semibold text-agri-text mb-4">Personal Details</h2>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-full mr-3">
              <User size={18} className="text-agri-primary" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Full Name</p>
              <p className="text-sm font-medium">
                {role === "farmer" ? "Rajesh Kumar" : "Ankit Sharma"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-full mr-3">
              <MapPin size={18} className="text-agri-primary" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm font-medium">
                {role === "farmer" ? "Nashik, Maharashtra" : "Pune, Maharashtra"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-full mr-3">
              <Phone size={18} className="text-agri-primary" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Phone Number</p>
              <p className="text-sm font-medium">+91 98765 43210</p>
            </div>
          </div>
        </div>
        
        <button className="mt-4 text-sm text-agri-primary font-medium">
          Edit Profile
        </button>
      </div>
      
      {/* Role-specific section */}
      {role === "farmer" ? (
        <div className="agri-card">
          <h2 className="text-lg font-semibold text-agri-text mb-4">Crop Management</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-agri-text">Tomatoes</h3>
                  <p className="text-xs text-gray-500">Sown: 15 Mar 2023</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Growing
                </span>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Expected harvest:</span>
                  <span className="text-xs font-medium">30 May 2023</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Quantity:</span>
                  <span className="text-xs font-medium">300 kg (estimated)</span>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-agri-text">Potatoes</h3>
                  <p className="text-xs text-gray-500">Sown: 10 Feb 2023</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Growing
                </span>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Expected harvest:</span>
                  <span className="text-xs font-medium">15 Jun 2023</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Quantity:</span>
                  <span className="text-xs font-medium">500 kg (estimated)</span>
                </div>
              </div>
            </div>
          </div>
          
          <button className="mt-4 text-sm text-agri-primary font-medium">
            Add New Crop
          </button>
        </div>
      ) : (
        <div className="agri-card">
          <h2 className="text-lg font-semibold text-agri-text mb-4">Buying Preferences</h2>
          
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-gray-100 text-agri-text px-3 py-1 rounded-full">
                Tomatoes
              </span>
              <span className="text-xs bg-gray-100 text-agri-text px-3 py-1 rounded-full">
                Potatoes
              </span>
              <span className="text-xs bg-gray-100 text-agri-text px-3 py-1 rounded-full">
                Onions
              </span>
              <span className="text-xs bg-gray-100 text-agri-text px-3 py-1 rounded-full">
                Peppers
              </span>
            </div>
            
            <div className="pt-3 border-t border-gray-200">
              <h3 className="text-sm font-medium text-agri-text mb-2">Preferred Locations</h3>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 text-agri-text px-3 py-1 rounded-full">
                  Pune
                </span>
                <span className="text-xs bg-gray-100 text-agri-text px-3 py-1 rounded-full">
                  Nashik
                </span>
                <span className="text-xs bg-gray-100 text-agri-text px-3 py-1 rounded-full">
                  Mumbai
                </span>
              </div>
            </div>
          </div>
          
          <button className="mt-4 text-sm text-agri-primary font-medium">
            Edit Preferences
          </button>
        </div>
      )}
      
      {/* Settings & Logout */}
      <div className="space-y-2">
        <button className="flex items-center w-full agri-card p-4">
          <Settings size={18} className="mr-3 text-gray-500" />
          <span className="font-medium">Settings</span>
        </button>
        
        <button className="flex items-center w-full agri-card p-4 text-red-500">
          <LogOut size={18} className="mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
