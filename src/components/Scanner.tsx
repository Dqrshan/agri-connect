import React, { useState, useRef, useEffect } from "react";
import { Camera, ImagePlus, Loader2, AlertTriangle, CheckCircle, X } from "lucide-react";
import { toast } from "../hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ScanResult {
  id: string;
  date: string;
  cropName: string;
  healthStatus: "healthy" | "diseased" | "pest" | "nutrient_deficiency";
  confidence: number;
  diagnosis: string;
  recommendations: string[];
  imageUrl?: string;
}

const Scanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [previousScans, setPreviousScans] = useState<ScanResult[]>([]);
  const [selectedScan, setSelectedScan] = useState<ScanResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Load previous scans from localStorage on component mount
  useEffect(() => {
    const loadScans = () => {
      const savedScans = localStorage.getItem('cropScannerScans');
      if (savedScans) {
        try {
          const parsedScans = JSON.parse(savedScans);
          setPreviousScans(parsedScans);
        } catch (error) {
          console.error("Failed to parse saved scans:", error);
          localStorage.removeItem('cropScannerScans');
        }
      }
    };
    loadScans();
  }, []);

  // Save scans to localStorage whenever they change
  useEffect(() => {
    if (previousScans.length > 0) {
      localStorage.setItem('cropScannerScans', JSON.stringify(previousScans));
    }
  }, [previousScans]);

  const analyzeImageWithGemini = async (imageBase64: string) => {
    try {
      const prompt = `
        Analyze this agricultural crop image and provide a detailed assessment in the following JSON format:
        {
          "cropName": "identified crop name",
          "healthStatus": "healthy/diseased/pest/nutrient_deficiency",
          "confidence": "percentage confidence in analysis",
          "diagnosis": "detailed diagnosis of plant health",
          "recommendations": ["array", "of", "recommendations"]
        }
        
        Be specific about any diseases, pests, or nutrient deficiencies detected. 
        Provide practical recommendations for treatment or maintenance.
        If the image doesn't contain a recognizable crop, return "unknown" for cropName.
      `;

      // @ts-ignore
      const apiKey = process.env.VITE_GEMINI_API_KEY.replaceAll('"', "").replaceAll(";", "");
      // @ts-ignore
      const response = await fetch((`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: imageBase64.split(',')[1]
                }
              }
            ]
          }]
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const textResponse = data.candidates[0].content.parts[0].text;
      
      try {
        const jsonStart = textResponse.indexOf('{');
        const jsonEnd = textResponse.lastIndexOf('}') + 1;
        const jsonString = textResponse.slice(jsonStart, jsonEnd);
        const result = JSON.parse(jsonString);
        
        return {
          ...result,
          confidence: parseInt(result.confidence) || 80
        };
      } catch (e) {
        console.error("Failed to parse JSON from response:", textResponse);
        throw new Error("AI response format error");
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  };

  const startScanning = async () => {
    setIsScanning(true);
    try {
      toast({
        title: "Camera Not Implemented",
        description: "Camera capture functionality would be implemented in a production app",
      });
      setIsScanning(false);
    } catch (error) {
      console.error("Scanning error:", error);
      setIsScanning(false);
      toast({
        title: "Scan Failed",
        description: "Could not complete the scan. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setIsScanning(true);
    
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        const analysis = await analyzeImageWithGemini(base64Image);
        
        const scanResult: ScanResult = {
          id: `SCAN-${Date.now()}`,
          date: new Date().toISOString(),
          cropName: analysis.cropName || "Unknown Crop",
          healthStatus: analysis.healthStatus || "healthy",
          confidence: analysis.confidence,
          diagnosis: analysis.diagnosis || "No specific diagnosis available",
          recommendations: analysis.recommendations || ["No specific recommendations"],
          imageUrl: imageUrl
        };
        
        setScanResults([scanResult]);
        setPreviousScans(prev => [scanResult, ...prev].slice(0, 20)); // Keep last 20 scans
        setShowResults(true);
        setIsScanning(false);
        
        toast({
          title: "Scan Complete",
          description: "AI analysis of your uploaded image has been completed.",
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Analysis error:", error);
      setIsScanning(false);
      toast({
        title: "Analysis Failed",
        description: "Could not analyze the image. Please try again.",
        variant: "destructive",
      });
    }
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

  const viewScanDetails = (scan: ScanResult) => {
    setSelectedScan(scan);
  };

  const closeScanDetails = () => {
    setSelectedScan(null);
  };
  
  const getStatusIcon = (status: ScanResult['healthStatus']) => {
    switch (status) {
      case "healthy": return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "diseased": return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "pest": return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case "nutrient_deficiency": return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default: return null;
    }
  };
  
  const getStatusText = (status: ScanResult['healthStatus']) => {
    switch (status) {
      case "healthy": return "Healthy";
      case "diseased": return "Disease Detected";
      case "pest": return "Pest Infestation";
      case "nutrient_deficiency": return "Nutrient Deficiency";
      default: return "Unknown";
    }
  };
  
  const getStatusColor = (status: ScanResult['healthStatus']) => {
    switch (status) {
      case "healthy": return "bg-green-50 border-green-200 text-green-800";
      case "diseased": return "bg-red-50 border-red-200 text-red-800";
      case "pest": return "bg-orange-50 border-orange-200 text-orange-800";
      case "nutrient_deficiency": return "bg-yellow-50 border-yellow-200 text-yellow-800";
      default: return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">AI Crop Scanner</h1>
      <p className="inline-flex mb-4 items-center gap-2">Powered by <img src="/gemini.png" className="h-6 mb-2" /></p>
      {!showResults ? (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col items-center justify-center">
            {isScanning ? (
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                  {selectedImage ? (
                    <div className="relative w-32 h-32 mb-4">
                      <img 
                        src={selectedImage} 
                        alt="Selected crop" 
                        className="w-full h-full object-cover rounded-lg" 
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                        <Loader2 size={48} className="text-white animate-spin" />
                      </div>
                    </div>
                  ) : (
                    <Camera size={48} className="text-gray-400 mb-2" />
                  )}
                  <p className="text-gray-500 mt-2">Analyzing crop health with AI...</p>
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
                    <div 
                      key={scan.id} 
                      className="border rounded-md p-3 flex items-center cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => viewScanDetails(scan)}
                    >
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
                {result.imageUrl && (
                  <div className="mb-4 flex justify-center">
                    <img 
                      src={result.imageUrl} 
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

      {/* Scan Details Modal */}
      <Dialog open={!!selectedScan} onOpenChange={closeScanDetails}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {selectedScan && getStatusIcon(selectedScan.healthStatus)}
              <span className="ml-2">
                {selectedScan?.cropName} Scan Details
              </span>
              {/* <button 
                onClick={closeScanDetails}
                className="ml-auto p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button> */}
            </DialogTitle>
          </DialogHeader>
          
          {selectedScan && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">
                  {formatDate(selectedScan.date)}
                </span>
                <span className="bg-white border rounded-full px-3 py-1 text-sm font-medium">
                  Confidence: {selectedScan.confidence}%
                </span>
              </div>
              
              {selectedScan.imageUrl && (
                <div className="mb-4 flex justify-center">
                  <img 
                    src={selectedScan.imageUrl} 
                    alt="Scanned crop" 
                    className="rounded-lg max-h-64 object-contain" 
                  />
                </div>
              )}
              
              <Alert className={`mb-4 ${getStatusColor(selectedScan.healthStatus)}`}>
                <AlertTitle className="flex items-center">
                  {getStatusIcon(selectedScan.healthStatus)} {getStatusText(selectedScan.healthStatus)}
                </AlertTitle>
                <AlertDescription className="mt-2">
                  {selectedScan.diagnosis}
                </AlertDescription>
              </Alert>
              
              <div className="mt-4">
                <h3 className="font-medium mb-2">Recommendations:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedScan.recommendations.map((rec, index) => (
                    <li key={index} className="text-gray-700">{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Scanner;