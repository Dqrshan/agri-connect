
import React, { useState } from "react";
import MarketTrends from "./MarketTrends";
import { AlertTriangle, Cloud, Sun, Droplets, ArrowRight, CheckCircle, X } from "lucide-react";
import { toast } from "../hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const FarmerDashboard: React.FC = () => {
  // Get current date for the header
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  // Alert states
  const [alerts, setAlerts] = useState([
    {
      id: "alert1",
      type: "irrigation",
      title: "Irrigation Alert",
      description: "Your tomato crops need irrigation today. Soil moisture levels are below optimal.",
      isDismissed: false,
    },
    {
      id: "alert2",
      type: "disease",
      title: "Disease Risk Alert",
      description: "High humidity levels increase risk of fungal diseases in your potato crop.",
      isDismissed: false,
    },
    {
      id: "alert3",
      type: "market",
      title: "Price Alert",
      description: "Tomato prices have increased by 15% in nearby markets. Consider selling now.",
      isDismissed: false,
    }
  ]);
  
  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, isDismissed: true } : alert
    ));
    
    toast({
      title: "Alert Dismissed",
      description: "The alert has been dismissed successfully",
    });
  };
  
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "irrigation":
        return <Droplets className="h-4 w-4 text-blue-500" />;
      case "disease":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "market":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };
  
  const getAlertColor = (type: string) => {
    switch (type) {
      case "irrigation":
        return "border-blue-500 bg-blue-50";
      case "disease":
        return "border-red-500 bg-red-50";
      case "market":
        return "border-green-500 bg-green-50";
      default:
        return "border-yellow-500 bg-yellow-50";
    }
  };
  
  const activeAlerts = alerts.filter(alert => !alert.isDismissed);
  
  return (
    <div className="space-y-4 pb-20">
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
      
      {/* Alerts Section - Show only if there are active alerts */}
      {activeAlerts.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-agri-text mb-3">Today's Alerts</h2>
          
          <div className="space-y-3">
            {activeAlerts.map((alert) => (
              <Alert key={alert.id} className={`relative ${getAlertColor(alert.type)}`}>
                <button 
                  onClick={() => dismissAlert(alert.id)}
                  className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
                <AlertTitle className="flex items-center font-medium">
                  {getAlertIcon(alert.type)} <span className="ml-2">{alert.title}</span>
                </AlertTitle>
                <AlertDescription className="text-sm mt-1">
                  {alert.description}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </div>
      )}
      
      {/* Market Trends Section */}
      <MarketTrends />
      
      {/* Updates Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-agri-text">Updates</h2>
          <button className="text-sm text-agri-primary font-medium">See All</button>
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
          
          <button className="w-full mt-4 py-2 text-sm text-indigo-600 flex items-center justify-center">
            View All Crops <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
