
import React, { useState } from "react";
import { Camera } from "lucide-react";

const Scanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  
  const startScanning = () => {
    setIsScanning(true);
    // In a real app, this would activate the camera
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">AI Crop Scanner</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col items-center justify-center">
          {isScanning ? (
            <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="animate-pulse">
                <Camera size={48} className="text-gray-400" />
                <p className="text-gray-500 mt-2">Scanning...</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Camera size={48} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 mb-4">Tap to scan your crop</p>
                <button
                  onClick={startScanning}
                  className="py-2 px-6 bg-indigo-500 text-white rounded-full"
                >
                  Start Scanning
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Previous Scans</h3>
          <p className="text-gray-500">No previous scans found</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-bold mb-2">How to use the scanner</h3>
        <ol className="list-decimal pl-5 space-y-2 text-gray-600">
          <li>Position your camera to focus on the crop or plant</li>
          <li>Ensure good lighting for better results</li>
          <li>Hold steady while scanning</li>
          <li>Review the AI analysis after scan completes</li>
        </ol>
      </div>
    </div>
  );
};

export default Scanner;
