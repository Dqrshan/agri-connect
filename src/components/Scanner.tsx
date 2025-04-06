
import React, { useState, useRef, useEffect } from "react";
import { Camera, ImagePlus, Loader2, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "../hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ScanResult {
  id: string;
  date: string;
  cropName: string;
  healthStatus: "healthy" | "diseased" | "pest" | "nutrient_deficiency";
  confidence: number;
  diagnosis: string;
  recommendations: string[];
}

const Scanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [previousScans, setPreviousScans] = useState<ScanResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Load previous scans from localStorage on component mount
  useEffect(() => {
    const savedScans = localStorage.getItem('previousScans');
    if (savedScans) {
      setPreviousScans(JSON.parse(savedScans));
    }
  }, []);

  // Save scans to localStorage whenever they change
  useEffect(() => {
    if (previousScans.length > 0) {
      localStorage.setItem('previousScans', JSON.stringify(previousScans));
    }
  }, [previousScans]);

  const startScanning = () => {
    setIsScanning(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
      
      // Generate mock scan result
      const mockResult: ScanResult = {
        id: `SCAN${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        cropName: "Tomato",
        healthStatus: Math.random() > 0.5 ? "healthy" : "diseased",
        confidence: Math.floor(Math.random() * 30) + 70, // 70-99%
        diagnosis: Math.random() > 0.5 
          ? "Early signs of leaf blight detected. The fungal infection is starting to affect the lower leaves."
          : "The plant appears healthy with good leaf color and development. No signs of disease or pest damage.",
        recommendations: Math.random() > 0.5 
          ? [
              "Apply copper-based fungicide as soon as possible", 
              "Improve air circulation around plants",
              "Avoid overhead watering to keep leaves dry",
              "Remove affected leaves to prevent spread"
            ]
          : [
              "Continue regular watering schedule", 
              "Maintain current fertilization program",
              "Monitor for any changes in leaf color or texture",
              "Consider harvesting within 2-3 weeks based on maturity"
            ]
      };
      
      // Update scan results
      setScanResults([mockResult]);
      
      // Add to previous scans
      setPreviousScans(prev => [mockResult, ...prev].slice(0, 10)); // Keep only most recent 10 scans

      toast({
        title: "Scan Complete",
        description: "AI analysis of your crop has been completed.",
      });
    }, 3000);
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Create URL for the selected image
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    
    // Start the scanning process
    setIsScanning(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
      
      // Generate mock scan result for uploaded image
      const cropTypes = ["Tomato", "Potato", "Wheat", "Rice", "Cotton"];
      const healthStatuses: ScanResult['healthStatus'][] = ["healthy", "diseased", "pest", "nutrient_deficiency"];
      
      const mockResult: ScanResult = {
        id: `SCAN${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        cropName: cropTypes[Math.floor(Math.random() * cropTypes.length)],
        healthStatus: healthStatuses[Math.floor(Math.random() * healthStatuses.length)],
        confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
        diagnosis: "",
        recommendations: []
      };

      // Set diagnosis and recommendations based on health status
      switch (mockResult.healthStatus) {
        case "healthy":
          mockResult.diagnosis = "The crop appears healthy with good coloration and development. No signs of disease or pest damage detected.";
          mockResult.recommendations = [
            "Continue regular watering schedule", 
            "Maintain current fertilization program",
            "Monitor for any changes in leaf color or texture"
          ];
          break;
        case "diseased":
          mockResult.diagnosis = "Signs of fungal infection detected. Affected areas show discoloration and lesions characteristic of blight.";
          mockResult.recommendations = [
            "Apply appropriate fungicide as soon as possible", 
            "Improve air circulation around plants",
            "Avoid overhead watering to keep leaves dry",
            "Remove severely affected parts to prevent spread"
          ];
          break;
        case "pest":
          mockResult.diagnosis = "Evidence of pest infestation detected. Leaf damage patterns indicate possible aphid or mite presence.";
          mockResult.recommendations = [
            "Apply neem oil or appropriate insecticide", 
            "Introduce beneficial insects like ladybugs if available",
            "Check undersides of leaves where pests often hide",
            "Monitor daily for pest population changes"
          ];
          break;
        case "nutrient_deficiency":
          mockResult.diagnosis = "Signs of nutrient deficiency observed. Yellowing patterns and growth abnormalities suggest nitrogen or magnesium deficiency.";
          mockResult.recommendations = [
            "Apply balanced fertilizer with focus on missing nutrients", 
            "Consider foliar feeding for faster uptake",
            "Test soil pH as it may be affecting nutrient availability",
            "Adjust watering schedule to prevent nutrient leaching"
          ];
          break;
      }
      
      // Update scan results
      setScanResults([mockResult]);
      
      // Add to previous scans
      setPreviousScans(prev => [mockResult, ...prev].slice(0, 10)); // Keep only most recent 10 scans

      toast({
        title: "Scan Complete",
        description: "AI analysis of your uploaded image has been completed.",
      });
    }, 3000);
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const resetScan = () => {
    setShowResults(false);
    setSelectedImage(null);
    setScanResults([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const getStatusIcon = (status: ScanResult['healthStatus']) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "diseased":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "pest":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case "nutrient_deficiency":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };
  
  const getStatusText = (status: ScanResult['healthStatus']) => {
    switch (status) {
      case "healthy":
        return "Healthy";
      case "diseased":
        return "Disease Detected";
      case "pest":
        return "Pest Infestation";
      case "nutrient_deficiency":
        return "Nutrient Deficiency";
      default:
        return "Unknown";
    }
  };
  
  const getStatusColor = (status: ScanResult['healthStatus']) => {
    switch (status) {
      case "healthy":
        return "bg-green-50 border-green-200 text-green-800";
      case "diseased":
        return "bg-red-50 border-red-200 text-red-800";
      case "pest":
        return "bg-orange-50 border-orange-200 text-orange-800";
      case "nutrient_deficiency":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="container mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">AI Crop Scanner</h1>
      
      {!showResults ? (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col items-center justify-center">
            {isScanning ? (
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                  {selectedImage ? (
                    <div className="relative w-32 h-32 mb-4">
                      <img src={selectedImage} alt="Selected crop" className="w-full h-full object-cover rounded-lg" />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                        <Loader2 size={48} className="text-white animate-spin" />
                      </div>
                    </div>
                  ) : (
                    <Camera size={48} className="text-gray-400 mb-2" />
                  )}
                  <p className="text-gray-500 mt-2">Analyzing crop health...</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Camera size={48} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-6">Upload or capture an image of your crop for AI analysis</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={startScanning}
                      className="py-2 px-6 bg-indigo-500 text-white rounded-full flex items-center justify-center"
                    >
                      <Camera size={18} className="mr-2" />
                      Use Camera
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                    />
                    <button
                      onClick={triggerFileInput}
                      className="py-2 px-6 bg-white text-indigo-500 border border-indigo-500 rounded-full flex items-center justify-center"
                    >
                      <ImagePlus size={18} className="mr-2" />
                      Upload Image
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <Tabs defaultValue="instructions" className="mt-6">
            <TabsList className="mb-4">
              <TabsTrigger value="instructions">How to use</TabsTrigger>
              <TabsTrigger value="history">Previous Scans</TabsTrigger>
            </TabsList>
            
            <TabsContent value="instructions">
              <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                <li>Position your camera to focus clearly on the crop or plant</li>
                <li>Ensure good lighting for better results</li>
                <li>Hold steady while scanning</li>
                <li>For best results, focus on affected areas if examining disease</li>
                <li>Review the AI analysis after scan completes</li>
              </ol>
            </TabsContent>
            
            <TabsContent value="history">
              {previousScans.length > 0 ? (
                <div className="space-y-3">
                  {previousScans.map((scan) => (
                    <div key={scan.id} className="border rounded-md p-3 flex items-center">
                      {getStatusIcon(scan.healthStatus)}
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{scan.cropName}</span>
                          <span className="text-xs text-gray-500">{formatDate(scan.date)}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{getStatusText(scan.healthStatus)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No previous scans found</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="mb-6">
          {scanResults.map((result) => (
            <Card key={result.id} className={`border-l-4 mb-4 ${getStatusColor(result.healthStatus)}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      {getStatusIcon(result.healthStatus)}
                      <span className="ml-2">{result.cropName} Analysis</span>
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-1">Scan ID: {result.id} • {formatDate(result.date)}</p>
                  </div>
                  <div className="bg-white border rounded-full px-3 py-1 text-sm font-medium">
                    Confidence: {result.confidence}%
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {selectedImage && (
                  <div className="mb-4 flex justify-center">
                    <img 
                      src={selectedImage} 
                      alt="Scanned crop" 
                      className="rounded-lg max-h-64 object-contain" 
                    />
                  </div>
                )}
                
                <Alert className={`mb-4 ${getStatusColor(result.healthStatus)}`}>
                  <AlertTitle className="flex items-center">
                    {getStatusIcon(result.healthStatus)} {getStatusText(result.healthStatus)}
                  </AlertTitle>
                  <AlertDescription className="mt-2">{result.diagnosis}</AlertDescription>
                </Alert>
                
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Recommendations:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="text-gray-700">{rec}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={resetScan}
                    className="py-2 px-6 bg-indigo-500 text-white rounded-full"
                  >
                    Scan Another Crop
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Scanner;
