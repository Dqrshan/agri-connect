
import React from "react";
import { useUser } from "../context/UserContext";

interface ProfileSectionProps {
  role: "farmer" | "buyer";
  onLogout?: () => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ role, onLogout }) => {
  const { fullName, phoneNumber, state, city } = useUser();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {fullName ? fullName.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <h2 className="text-xl font-bold">{fullName || "User"}</h2>
            <p className="text-gray-500">{role === "farmer" ? "Seller" : "Buyer"}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="font-medium">{phoneNumber || "Not provided"}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">State</p>
              <p className="font-medium">{state || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">City</p>
              <p className="font-medium">{city || "Not provided"}</p>
            </div>
          </div>
        </div>
      </div>
      
      {role === "farmer" && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">Crop Management</h3>
          <p className="text-gray-500">No crops added yet</p>
          
          <button className="mt-4 py-2 px-4 bg-indigo-100 text-indigo-700 rounded-md">
            Add Crop
          </button>
        </div>
      )}
      
      {role === "buyer" && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">Buying Preferences</h3>
          <p className="text-gray-500">No preferences set</p>
          
          <button className="mt-4 py-2 px-4 bg-indigo-100 text-indigo-700 rounded-md">
            Set Preferences
          </button>
        </div>
      )}
      
      <div className="mt-8">
        <button
          onClick={onLogout}
          className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
