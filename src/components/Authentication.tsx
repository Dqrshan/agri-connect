import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";

interface AuthProps {
  type: "login" | "signup" | "otp";
  onNavigate: (page: "login" | "signup" | "otp" | "dashboard") => void;
}

const Authentication: React.FC<AuthProps> = ({ type, onNavigate }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState<"farmer" | "buyer" | "">("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  
  const handleOtpChange = (value: string) => {
    setOtp(value.split("").concat(Array(6 - value.length).fill("")));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "login") {
      // In a real app, this would verify the phone number and send OTP
      onNavigate("otp");
    } else if (type === "signup") {
      // In a real app, this would register the user and send OTP
      onNavigate("otp");
    } else if (type === "otp") {
      // In a real app, this would verify the OTP
      onNavigate("dashboard");
    }
  };
  
  const isFormValid = () => {
    if (type === "login") {
      return phoneNumber.length === 10;
    } else if (type === "signup") {
      return (
        phoneNumber.length === 10 &&
        fullName.trim() !== "" &&
        state.trim() !== "" &&
        city.trim() !== "" &&
        (role === "farmer" || role === "buyer")
      );
    } else if (type === "otp") {
      return otp.every(digit => digit !== "");
    }
    return false;
  };
  
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mb-6 flex items-center">
        <button 
          onClick={() => onNavigate(type === "otp" ? (phoneNumber ? "login" : "signup") : "login")} 
          className="inline-flex items-center text-gray-700"
        >
          <ArrowLeft size={20} className="mr-2" />
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        {type !== "otp" && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Hello!</h2>
            <p className="text-gray-500">
              {type === "login" 
                ? "Log In to your existing account" 
                : "Sign Up to create an account"}
            </p>
          </div>
        )}
        
        {type === "otp" && (
          <div className="flex justify-center mb-8">
            <div className="h-16 w-16 rounded-full bg-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
              A
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {type === "login" && (
            <div className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full p-3 bg-gray-100 rounded-md border border-gray-200"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  required
                />
              </div>
            </div>
          )}
          
          {type === "signup" && (
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="w-full p-3 bg-gray-100 rounded-md border border-gray-200"
                  placeholder="Enter your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    className="w-full p-3 bg-gray-100 rounded-md border border-gray-200"
                    placeholder="Enter your state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="w-full p-3 bg-gray-100 rounded-md border border-gray-200"
                    placeholder="Enter your city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="flex items-center">
                  <span className="inline-flex items-center px-3 py-3 rounded-l-md border border-r-0 border-gray-200 bg-gray-100 text-gray-500">
                    (+91)
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full p-3 bg-gray-100 rounded-r-md border border-gray-200"
                    placeholder=""
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Are you a?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className={`py-3 px-4 rounded-md border transition-all ${
                      role === "farmer"
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-medium"
                        : "border-gray-300 text-gray-700"
                    }`}
                    onClick={() => setRole("farmer")}
                  >
                    Seller
                  </button>
                  
                  <button
                    type="button"
                    className={`py-3 px-4 rounded-md border transition-all ${
                      role === "buyer"
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-medium"
                        : "border-gray-300 text-gray-700"
                    }`}
                    onClick={() => setRole("buyer")}
                  >
                    Buyer
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {type === "otp" && (
            <div className="space-y-8">
              <div className="border border-gray-200 rounded-md p-3 mb-6">
                <input
                  type="text"
                  className="w-full border-none text-center text-lg"
                  placeholder="Enter your otp"
                  onChange={(e) => {}}
                />
              </div>
              
              <div className="flex justify-between space-x-2">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div 
                    key={num} 
                    className="w-10 h-10 border border-gray-200 rounded-md flex items-center justify-center text-lg"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors"
              disabled={!isFormValid()}
            >
              {type === "login" ? "Log In" : 
               type === "signup" ? "Sign Up" : 
               "Log In"}
            </button>
          </div>
        </form>
        
        {type === "login" && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                className="text-indigo-600 font-medium hover:underline"
                onClick={() => onNavigate("signup")}
              >
                Sign up
              </button>
            </p>
          </div>
        )}
        
        {type === "signup" && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                className="text-indigo-600 font-medium hover:underline"
                onClick={() => onNavigate("login")}
              >
                Login
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Authentication;
