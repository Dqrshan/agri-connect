
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Crop {
  id: number;
  name: string;
  color: string;
}

const MarketTrends: React.FC = () => {
  // This would come from an API in a real app
  const crops: Crop[] = [
    { id: 1, name: "Tomatoes", color: "#FF5252" },
    { id: 2, name: "Potatoes", color: "#FFA000" },
    { id: 3, name: "Onions", color: "#7C4DFF" },
  ];
  
  // This would come from an API in a real app
  const data = [
    { date: "Jan", Tomatoes: 40, Potatoes: 24, Onions: 35 },
    { date: "Feb", Tomatoes: 45, Potatoes: 28, Onions: 32 },
    { date: "Mar", Tomatoes: 30, Potatoes: 25, Onions: 38 },
    { date: "Apr", Tomatoes: 50, Potatoes: 32, Onions: 30 },
    { date: "May", Tomatoes: 55, Potatoes: 36, Onions: 34 },
    { date: "Jun", Tomatoes: 48, Potatoes: 30, Onions: 40 },
  ];
  
  return (
    <div className="agri-card mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-agri-text">Market Trends</h2>
        <button className="text-sm text-agri-primary font-medium">See All</button>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="date" fontSize={12} tickMargin={10} />
            <YAxis fontSize={12} tickMargin={10} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#fff", 
                border: "1px solid #f0f0f0",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }} 
              labelStyle={{ fontWeight: "bold", marginBottom: "5px" }}
            />
            <Legend wrapperStyle={{ paddingTop: "10px" }} />
            {crops.map((crop) => (
              <Line
                key={crop.id}
                type="monotone"
                dataKey={crop.name}
                stroke={crop.color}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2">
        {crops.map((crop) => (
          <div key={crop.id} className="flex flex-col items-center bg-gray-50 rounded-lg p-2">
            <div className="flex items-center">
              <div
                className="h-3 w-3 rounded-full mr-1"
                style={{ backgroundColor: crop.color }}
              ></div>
              <span className="text-sm font-medium">{crop.name}</span>
            </div>
            <span className="text-xs text-gray-500">₹{Math.floor(Math.random() * 30) + 40}/kg</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketTrends;
