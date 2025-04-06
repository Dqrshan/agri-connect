
import React from "react";
import MarketTrends from "./MarketTrends";
import { FileText, MapPin } from "lucide-react";

const BuyerDashboard: React.FC = () => {
  // Get current date for the header
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  // Dummy data for available crops
  const availableCrops = [
    {
      id: 1,
      crop: "Tomatoes",
      farmer: "Rajesh Kumar",
      location: "Nashik, Maharashtra",
      price: "₹48/kg",
      quantity: "300 kg available",
      distance: "15 km",
    },
    {
      id: 2,
      crop: "Potatoes",
      farmer: "Suresh Singh",
      location: "Pune, Maharashtra",
      price: "₹32/kg",
      quantity: "500 kg available",
      distance: "8 km",
    },
    {
      id: 3,
      crop: "Onions",
      farmer: "Mahesh Patel",
      location: "Nashik, Maharashtra",
      price: "₹35/kg",
      quantity: "250 kg available",
      distance: "12 km",
    },
  ];
  
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-agri-text">Hi, Ankit</h1>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
        <div className="bg-agri-primary text-white w-10 h-10 rounded-full flex items-center justify-center">
          <span className="font-medium">A</span>
        </div>
      </div>
      
      {/* Market Trends Section */}
      <MarketTrends />
      
      {/* Available Crops Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-agri-text">Available Crops</h2>
          <button className="text-sm text-agri-primary font-medium">See All</button>
        </div>
        
        <div className="space-y-4">
          {availableCrops.map((item) => (
            <div key={item.id} className="agri-card">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-agri-text">{item.crop}</h3>
                  <p className="text-sm text-gray-600 mb-1">{item.farmer}</p>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <MapPin size={12} className="mr-1" />
                    <span>{item.location}</span>
                    <span className="mx-1">•</span>
                    <span>{item.distance}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-agri-primary">{item.price}</span>
                  <p className="text-xs text-gray-500">{item.quantity}</p>
                </div>
              </div>
              <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
                <button className="text-sm text-agri-primary font-medium flex items-center">
                  <FileText size={16} className="mr-1" />
                  View Details
                </button>
                <button className="text-sm bg-agri-primary text-white px-4 py-1 rounded-full">
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Market News Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-agri-text">Market News</h2>
          <button className="text-sm text-agri-primary font-medium">See All</button>
        </div>
        
        <div className="agri-card">
          <h3 className="font-medium text-agri-text mb-2">Agriculture Insights</h3>
          <p className="text-sm text-gray-600 mb-3">
            Recent rainfall across Maharashtra has improved crop prospects for the coming season. 
            Experts predict better yield for major vegetable crops.
          </p>
          <p className="text-xs text-gray-500">Updated 2 hours ago</p>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
