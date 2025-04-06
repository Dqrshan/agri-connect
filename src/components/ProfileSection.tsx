
import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Droplets, FilePlus, PlusCircle, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "../hooks/use-toast";

interface ProfileSectionProps {
  role: "farmer" | "buyer";
  onLogout?: () => void;
}

interface CropInfo {
  id: string;
  name: string;
  variety: string;
  sowingDate: string;
  area: string;
  notes: string;
}

interface FertilizerApplication {
  id: string;
  cropId: string;
  date: string;
  name: string;
  quantity: string;
  notes: string;
}

interface IrrigationEvent {
  id: string;
  cropId: string;
  date: string;
  duration: string;
  method: string;
  notes: string;
}

interface BuyerPreference {
  id: string;
  cropType: string;
  quantity: string;
  qualityPreference: string;
  priceRange: string;
  location: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ role, onLogout }) => {
  const { fullName, phoneNumber, state, city } = useUser();

  // Farmer specific states
  const [crops, setCrops] = useState<CropInfo[]>([
    {
      id: "crop1",
      name: "Tomatoes",
      variety: "Roma",
      sowingDate: "2025-02-15",
      area: "0.5 acre",
      notes: "Growing well, expecting harvest in May"
    }
  ]);
  
  const [fertilizers, setFertilizers] = useState<FertilizerApplication[]>([
    {
      id: "fert1",
      cropId: "crop1",
      date: "2025-03-10",
      name: "NPK 14-14-14",
      quantity: "50 kg",
      notes: "Applied before rainfall"
    }
  ]);
  
  const [irrigationEvents, setIrrigationEvents] = useState<IrrigationEvent[]>([
    {
      id: "irr1",
      cropId: "crop1",
      date: "2025-03-20",
      duration: "2 hours",
      method: "Drip irrigation",
      notes: "Regular weekly irrigation"
    }
  ]);

  // Buyer specific states
  const [buyerPreferences, setBuyerPreferences] = useState<BuyerPreference[]>([
    {
      id: "pref1",
      cropType: "Tomatoes",
      quantity: "100-200 kg weekly",
      qualityPreference: "Grade A, organic preferred",
      priceRange: "₹40-50 per kg",
      location: "Within 20km of Pune"
    }
  ]);

  // Form states
  const [newCrop, setNewCrop] = useState({
    name: "",
    variety: "",
    sowingDate: "",
    area: "",
    notes: ""
  });
  
  const [newFertilizer, setNewFertilizer] = useState({
    cropId: crops[0]?.id || "",
    date: "",
    name: "",
    quantity: "",
    notes: ""
  });
  
  const [newIrrigation, setNewIrrigation] = useState({
    cropId: crops[0]?.id || "",
    date: "",
    duration: "",
    method: "",
    notes: ""
  });
  
  const [newPreference, setNewPreference] = useState({
    cropType: "",
    quantity: "",
    qualityPreference: "",
    priceRange: "",
    location: ""
  });

  // Handlers
  const handleAddCrop = () => {
    if (!newCrop.name || !newCrop.sowingDate) {
      toast({
        title: "Missing Information",
        description: "Please provide at least crop name and sowing date",
        variant: "destructive"
      });
      return;
    }
    
    const crop: CropInfo = {
      id: `crop${Date.now()}`,
      ...newCrop
    };
    
    setCrops([...crops, crop]);
    setNewCrop({
      name: "",
      variety: "",
      sowingDate: "",
      area: "",
      notes: ""
    });
    
    toast({
      title: "Crop Added",
      description: `${crop.name} has been added to your crops`
    });
  };
  
  const handleDeleteCrop = (id: string) => {
    setCrops(crops.filter(crop => crop.id !== id));
    setFertilizers(fertilizers.filter(fert => fert.cropId !== id));
    setIrrigationEvents(irrigationEvents.filter(irr => irr.cropId !== id));
    toast({
      title: "Crop Deleted",
      description: "Crop and related records have been removed"
    });
  };
  
  const handleAddFertilizer = () => {
    if (!newFertilizer.cropId || !newFertilizer.name || !newFertilizer.date) {
      toast({
        title: "Missing Information",
        description: "Please select a crop and provide fertilizer name and application date",
        variant: "destructive"
      });
      return;
    }
    
    const fertilizer: FertilizerApplication = {
      id: `fert${Date.now()}`,
      ...newFertilizer
    };
    
    setFertilizers([...fertilizers, fertilizer]);
    setNewFertilizer({
      cropId: crops[0]?.id || "",
      date: "",
      name: "",
      quantity: "",
      notes: ""
    });
    
    toast({
      title: "Fertilizer Application Recorded",
      description: `Application of ${fertilizer.name} has been recorded`
    });
  };
  
  const handleAddIrrigation = () => {
    if (!newIrrigation.cropId || !newIrrigation.date || !newIrrigation.method) {
      toast({
        title: "Missing Information",
        description: "Please select a crop and provide irrigation date and method",
        variant: "destructive"
      });
      return;
    }
    
    const irrigation: IrrigationEvent = {
      id: `irr${Date.now()}`,
      ...newIrrigation
    };
    
    setIrrigationEvents([...irrigationEvents, irrigation]);
    setNewIrrigation({
      cropId: crops[0]?.id || "",
      date: "",
      duration: "",
      method: "",
      notes: ""
    });
    
    toast({
      title: "Irrigation Event Recorded",
      description: `Irrigation event on ${irrigation.date} has been recorded`
    });
  };
  
  const handleAddPreference = () => {
    if (!newPreference.cropType || !newPreference.quantity) {
      toast({
        title: "Missing Information",
        description: "Please provide at least crop type and quantity",
        variant: "destructive"
      });
      return;
    }
    
    const preference: BuyerPreference = {
      id: `pref${Date.now()}`,
      ...newPreference
    };
    
    setBuyerPreferences([...buyerPreferences, preference]);
    setNewPreference({
      cropType: "",
      quantity: "",
      qualityPreference: "",
      priceRange: "",
      location: ""
    });
    
    toast({
      title: "Preference Added",
      description: `Preference for ${preference.cropType} has been added`
    });
  };
  
  const handleDeletePreference = (id: string) => {
    setBuyerPreferences(buyerPreferences.filter(pref => pref.id !== id));
    toast({
      title: "Preference Deleted",
      description: "Buying preference has been removed"
    });
  };

  return (
    <div className="container mx-auto p-4 pb-20">
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
      
      {role === "farmer" ? (
        <Tabs defaultValue="crops" className="mb-20">
          <TabsList className="mb-4">
            <TabsTrigger value="crops">My Crops</TabsTrigger>
            <TabsTrigger value="fertilizers">Fertilizers</TabsTrigger>
            <TabsTrigger value="irrigation">Irrigation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="crops">
            <Card>
              <CardHeader>
                <CardTitle>Crop Management</CardTitle>
                <CardDescription>Track all your crops and their progress</CardDescription>
              </CardHeader>
              <CardContent>
                {crops.length > 0 ? (
                  <div className="space-y-4 mb-6">
                    {crops.map(crop => (
                      <div key={crop.id} className="border rounded-md p-4 relative">
                        <button 
                          onClick={() => handleDeleteCrop(crop.id)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                        <h3 className="font-medium">{crop.name} {crop.variety && `- ${crop.variety}`}</h3>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1 text-gray-400" />
                            <span>Sown: {crop.sowingDate}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-600">Area: {crop.area}</span>
                          </div>
                        </div>
                        {crop.notes && (
                          <p className="mt-2 text-sm text-gray-600">{crop.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 mb-4">No crops added yet</p>
                )}
                
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-medium mb-3 flex items-center">
                    <PlusCircle size={16} className="mr-1" />
                    Add New Crop
                  </h3>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Crop Name*</label>
                      <input
                        type="text"
                        value={newCrop.name}
                        onChange={e => setNewCrop({...newCrop, name: e.target.value})}
                        className="w-full p-2 border rounded-md"
                        placeholder="e.g., Tomatoes"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Variety</label>
                      <input
                        type="text"
                        value={newCrop.variety}
                        onChange={e => setNewCrop({...newCrop, variety: e.target.value})}
                        className="w-full p-2 border rounded-md"
                        placeholder="e.g., Roma"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sowing Date*</label>
                      <input
                        type="date"
                        value={newCrop.sowingDate}
                        onChange={e => setNewCrop({...newCrop, sowingDate: e.target.value})}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                      <input
                        type="text"
                        value={newCrop.area}
                        onChange={e => setNewCrop({...newCrop, area: e.target.value})}
                        className="w-full p-2 border rounded-md"
                        placeholder="e.g., 0.5 acre"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <Textarea
                      value={newCrop.notes}
                      onChange={e => setNewCrop({...newCrop, notes: e.target.value})}
                      className="w-full p-2 border rounded-md"
                      placeholder="Any additional details about this crop"
                    />
                  </div>
                  <button
                    onClick={handleAddCrop}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Add Crop
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="fertilizers">
            <Card>
              <CardHeader>
                <CardTitle>Fertilizer Applications</CardTitle>
                <CardDescription>Track fertilizer usage for your crops</CardDescription>
              </CardHeader>
              <CardContent>
                {fertilizers.length > 0 ? (
                  <div className="space-y-4 mb-6">
                    {fertilizers.map(fert => {
                      const cropName = crops.find(c => c.id === fert.cropId)?.name || "Unknown crop";
                      return (
                        <div key={fert.id} className="border rounded-md p-4">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{fert.name}</h3>
                            <span className="text-sm text-indigo-600">{cropName}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-1 text-gray-400" />
                              <span>Applied: {fert.date}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-600">Quantity: {fert.quantity}</span>
                            </div>
                          </div>
                          {fert.notes && (
                            <p className="mt-2 text-sm text-gray-600">{fert.notes}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 mb-4">No fertilizer applications recorded</p>
                )}
                
                {crops.length > 0 ? (
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-medium mb-3 flex items-center">
                      <FilePlus size={16} className="mr-1" />
                      Record Fertilizer Application
                    </h3>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Crop*</label>
                        <select
                          value={newFertilizer.cropId}
                          onChange={e => setNewFertilizer({...newFertilizer, cropId: e.target.value})}
                          className="w-full p-2 border rounded-md"
                        >
                          {crops.map(crop => (
                            <option key={crop.id} value={crop.id}>
                              {crop.name} {crop.variety && `(${crop.variety})`}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Application Date*</label>
                        <input
                          type="date"
                          value={newFertilizer.date}
                          onChange={e => setNewFertilizer({...newFertilizer, date: e.target.value})}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fertilizer Name*</label>
                        <input
                          type="text"
                          value={newFertilizer.name}
                          onChange={e => setNewFertilizer({...newFertilizer, name: e.target.value})}
                          className="w-full p-2 border rounded-md"
                          placeholder="e.g., NPK 14-14-14"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                        <input
                          type="text"
                          value={newFertilizer.quantity}
                          onChange={e => setNewFertilizer({...newFertilizer, quantity: e.target.value})}
                          className="w-full p-2 border rounded-md"
                          placeholder="e.g., 50 kg"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <Textarea
                        value={newFertilizer.notes}
                        onChange={e => setNewFertilizer({...newFertilizer, notes: e.target.value})}
                        className="w-full p-2 border rounded-md"
                        placeholder="Any additional details about this application"
                      />
                    </div>
                    <button
                      onClick={handleAddFertilizer}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Record Application
                    </button>
                  </div>
                ) : (
                  <div className="text-center p-4 border rounded-md bg-gray-50">
                    <p className="text-gray-500">Please add crops first before recording fertilizer applications</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="irrigation">
            <Card>
              <CardHeader>
                <CardTitle>Irrigation Events</CardTitle>
                <CardDescription>Track irrigation schedule for your crops</CardDescription>
              </CardHeader>
              <CardContent>
                {irrigationEvents.length > 0 ? (
                  <div className="space-y-4 mb-6">
                    {irrigationEvents.map(irr => {
                      const cropName = crops.find(c => c.id === irr.cropId)?.name || "Unknown crop";
                      return (
                        <div key={irr.id} className="border rounded-md p-4">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{irr.method}</h3>
                            <span className="text-sm text-indigo-600">{cropName}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-1 text-gray-400" />
                              <span>Date: {irr.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock size={14} className="mr-1 text-gray-400" />
                              <span>Duration: {irr.duration}</span>
                            </div>
                          </div>
                          {irr.notes && (
                            <p className="mt-2 text-sm text-gray-600">{irr.notes}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 mb-4">No irrigation events recorded</p>
                )}
                
                {crops.length > 0 ? (
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-medium mb-3 flex items-center">
                      <Droplets size={16} className="mr-1" />
                      Record Irrigation Event
                    </h3>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Crop*</label>
                        <select
                          value={newIrrigation.cropId}
                          onChange={e => setNewIrrigation({...newIrrigation, cropId: e.target.value})}
                          className="w-full p-2 border rounded-md"
                        >
                          {crops.map(crop => (
                            <option key={crop.id} value={crop.id}>
                              {crop.name} {crop.variety && `(${crop.variety})`}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Irrigation Date*</label>
                        <input
                          type="date"
                          value={newIrrigation.date}
                          onChange={e => setNewIrrigation({...newIrrigation, date: e.target.value})}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Method*</label>
                        <select
                          value={newIrrigation.method}
                          onChange={e => setNewIrrigation({...newIrrigation, method: e.target.value})}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="">Select method</option>
                          <option value="Drip irrigation">Drip irrigation</option>
                          <option value="Sprinkler">Sprinkler</option>
                          <option value="Flood irrigation">Flood irrigation</option>
                          <option value="Manual watering">Manual watering</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                        <input
                          type="text"
                          value={newIrrigation.duration}
                          onChange={e => setNewIrrigation({...newIrrigation, duration: e.target.value})}
                          className="w-full p-2 border rounded-md"
                          placeholder="e.g., 2 hours"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <Textarea
                        value={newIrrigation.notes}
                        onChange={e => setNewIrrigation({...newIrrigation, notes: e.target.value})}
                        className="w-full p-2 border rounded-md"
                        placeholder="Any additional details about this irrigation"
                      />
                    </div>
                    <button
                      onClick={handleAddIrrigation}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Record Irrigation
                    </button>
                  </div>
                ) : (
                  <div className="text-center p-4 border rounded-md bg-gray-50">
                    <p className="text-gray-500">Please add crops first before recording irrigation events</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="mb-20">
          <Card>
            <CardHeader>
              <CardTitle>Buying Preferences</CardTitle>
              <CardDescription>Set your preferences for crop purchases</CardDescription>
            </CardHeader>
            <CardContent>
              {buyerPreferences.length > 0 ? (
                <div className="space-y-4 mb-6">
                  {buyerPreferences.map(pref => (
                    <div key={pref.id} className="border rounded-md p-4 relative">
                      <button 
                        onClick={() => handleDeletePreference(pref.id)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                      <h3 className="font-medium">{pref.cropType}</h3>
                      <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                        <div className="flex items-center">
                          <span className="text-gray-600">Quantity: {pref.quantity}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-600">Price: {pref.priceRange}</span>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Quality: {pref.qualityPreference}</p>
                        <p>Location: {pref.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mb-4">No buying preferences set</p>
              )}
              
              <div className="border-t pt-4 mt-4">
                <h3 className="font-medium mb-3 flex items-center">
                  <PlusCircle size={16} className="mr-1" />
                  Add New Preference
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type*</label>
                    <input
                      type="text"
                      value={newPreference.cropType}
                      onChange={e => setNewPreference({...newPreference, cropType: e.target.value})}
                      className="w-full p-2 border rounded-md"
                      placeholder="e.g., Tomatoes"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity*</label>
                    <input
                      type="text"
                      value={newPreference.quantity}
                      onChange={e => setNewPreference({...newPreference, quantity: e.target.value})}
                      className="w-full p-2 border rounded-md"
                      placeholder="e.g., 100-200 kg weekly"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quality Preferences</label>
                    <input
                      type="text"
                      value={newPreference.qualityPreference}
                      onChange={e => setNewPreference({...newPreference, qualityPreference: e.target.value})}
                      className="w-full p-2 border rounded-md"
                      placeholder="e.g., Organic, Grade A"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                    <input
                      type="text"
                      value={newPreference.priceRange}
                      onChange={e => setNewPreference({...newPreference, priceRange: e.target.value})}
                      className="w-full p-2 border rounded-md"
                      placeholder="e.g., ₹40-50 per kg"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location Preference</label>
                  <input
                    type="text"
                    value={newPreference.location}
                    onChange={e => setNewPreference({...newPreference, location: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    placeholder="e.g., Within 20km of Pune"
                  />
                </div>
                <button
                  onClick={handleAddPreference}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add Preference
                </button>
              </div>
            </CardContent>
          </Card>
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
