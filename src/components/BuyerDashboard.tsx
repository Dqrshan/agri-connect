
import React, { useState } from "react";
import MarketTrends from "./MarketTrends";
import { FileText, MapPin, Bell, CheckCircle, ArrowRight, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "../hooks/use-toast";
import { useUser } from "@/context/UserContext";

const BuyerDashboard: React.FC = () => {
  const { fullName } = useUser();
  // Get current date for the header
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  // Dummy data for available crops
  const [availableCrops, setAvailableCrops] = useState([
    {
      id: 1,
      crop: "Tomatoes",
      farmer: "Rajesh Kumar",
      location: "Nashik, Maharashtra",
      price: "₹48/kg",
      quantity: "300 kg available",
      distance: "15 km",
      isFavorite: false,
    },
    {
      id: 2,
      crop: "Potatoes",
      farmer: "Suresh Singh",
      location: "Pune, Maharashtra",
      price: "₹32/kg",
      quantity: "500 kg available",
      distance: "8 km",
      isFavorite: false,
    },
    {
      id: 3,
      crop: "Onions",
      farmer: "Mahesh Patel",
      location: "Nashik, Maharashtra",
      price: "₹35/kg",
      quantity: "250 kg available",
      distance: "12 km",
      isFavorite: false,
    },
  ]);
  
  // Alerts for buyer
  const [alerts, setAlerts] = useState([
    {
      id: "alert1",
      type: "price",
      title: "Price Drop Alert",
      description: "Tomato prices have decreased by 10% in your favorite markets.",
      isDismissed: false,
    },
    {
      id: "alert2",
      type: "availability",
      title: "New Crop Available",
      description: "Fresh potatoes now available from farmers in your network.",
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
  
  const toggleFavorite = (cropId: number) => {
    setAvailableCrops(availableCrops.map(crop => 
      crop.id === cropId ? { ...crop, isFavorite: !crop.isFavorite } : crop
    ));
    
    const crop = availableCrops.find(c => c.id === cropId);
    if (crop) {
      toast({
        title: crop.isFavorite ? "Removed from Favorites" : "Added to Favorites",
        description: `${crop.crop} has been ${crop.isFavorite ? "removed from" : "added to"} your favorites.`,
      });
    }
  };
  
  const contactFarmer = (cropId: number) => {
    const crop = availableCrops.find(c => c.id === cropId);
    if (crop) {
      toast({
        title: "Contact Request Sent",
        description: `Your interest in ${crop.crop} has been sent to ${crop.farmer}.`,
      });
    }
  };
  
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "price":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "availability":
        return <Bell className="h-4 w-4 text-indigo-500" />;
      default:
        return <Bell className="h-4 w-4 text-yellow-500" />;
    }
  };
  
  const getAlertColor = (type: string) => {
    switch (type) {
      case "price":
        return "border-green-500 bg-green-50";
      case "availability":
        return "border-indigo-500 bg-indigo-50";
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
          <h1 className="text-2xl font-bold text-agri-text">Hi, {fullName}</h1>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
        <div className="bg-agri-primary text-white w-10 h-10 rounded-full flex items-center justify-center">
          <span className="font-medium">{fullName[0]}</span>
        </div>
      </div>
      
      {/* Alerts Section - Show only if there are active alerts */}
      {activeAlerts.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-agri-text mb-3">Alerts for You</h2>
          
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
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className={`text-sm font-medium flex items-center ${
                    item.isFavorite ? "text-red-500" : "text-agri-primary"
                  }`}
                >
                  <FileText size={16} className="mr-1" />
                  {item.isFavorite ? "Saved" : "Save for Later"}
                </button>
                <button
                  onClick={() => contactFarmer(item.id)}
                  className="text-sm bg-indigo-500 text-white px-4 py-1 rounded-full"
                >
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 py-2 text-sm text-indigo-600 flex items-center justify-center">
          View All Available Crops <ArrowRight size={16} className="ml-1" />
        </button>
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
