
import React from "react";
import MarketTrends from "./MarketTrends";
import { AlertTriangle, Cloud, Sun, Droplets } from "lucide-react";

const FarmerDashboard: React.FC = () => {
  // Get current date for the header
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-agri-text">Hi, Rajesh</h1>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
        <div className="bg-agri-primary text-white w-10 h-10 rounded-full flex items-center justify-center">
          <span className="font-medium">R</span>
        </div>
      </div>
      
      {/* Market Trends Section */}
      <MarketTrends />
      
      {/* Updates Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-agri-text">Updates</h2>
          <button className="text-sm text-agri-primary font-medium">See All</button>
        </div>
        
        {/* Alert */}
        <div className="agri-card mb-4 border-l-4 border-yellow-500">
          <div className="flex items-start">
            <div className="bg-yellow-100 rounded-full p-2 mr-3">
              <AlertTriangle size={20} className="text-yellow-500" />
            </div>
            <div>
              <h3 className="font-medium text-agri-text mb-1">Irrigation Alert</h3>
              <p className="text-sm text-gray-600">Your tomato crops need irrigation today. Soil moisture levels are below optimal.</p>
            </div>
          </div>
        </div>
        
        {/* Weather Cards */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="agri-card p-3 flex flex-col items-center">
            <Sun size={24} className="text-agri-accent mb-1" />
            <span className="text-xs text-gray-600">Sunny</span>
            <span className="text-sm font-medium">32°C</span>
          </div>
          
          <div className="agri-card p-3 flex flex-col items-center">
            <Droplets size={24} className="text-blue-500 mb-1" />
            <span className="text-xs text-gray-600">Humidity</span>
            <span className="text-sm font-medium">65%</span>
          </div>
          
          <div className="agri-card p-3 flex flex-col items-center">
            <Cloud size={24} className="text-gray-500 mb-1" />
            <span className="text-xs text-gray-600">Wind</span>
            <span className="text-sm font-medium">12 km/h</span>
          </div>
        </div>
        
        {/* Harvest Timeline */}
        <div className="agri-card">
          <h3 className="font-medium text-agri-text mb-3">Harvest Timeline</h3>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Tomatoes</span>
                  <span className="text-xs text-gray-500">15 days left</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-3"></div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Potatoes</span>
                  <span className="text-xs text-gray-500">30 days left</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: "50%" }}></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Onions</span>
                  <span className="text-xs text-gray-500">45 days left</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "25%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
