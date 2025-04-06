
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

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
  const [otp, setOtp] = useState(["", "", "", ""]);
  
  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
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
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-agri-primary">
          <ArrowLeft size={20} className="mr-2" />
          <span>Back</span>
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {type === "login" ? "Login to AgriConnect" : 
           type === "signup" ? "Create Account" : 
           "Verify OTP"}
        </h2>
        
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
                  className="agri-input"
                  placeholder="Enter your 10-digit phone number"
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
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="agri-input"
                  placeholder="Enter your full name"
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
                    className="agri-input"
                    placeholder="State"
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
                    className="agri-input"
                    placeholder="City"
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
                <input
                  type="tel"
                  id="phone"
                  className="agri-input"
                  placeholder="Enter your 10-digit phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I am a
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className={`py-3 px-4 rounded-md border-2 transition-all ${
                      role === "farmer"
                        ? "border-agri-primary bg-agri-primary text-white"
                        : "border-gray-300 hover:border-agri-primary"
                    }`}
                    onClick={() => setRole("farmer")}
                  >
                    Farmer
                  </button>
                  
                  <button
                    type="button"
                    className={`py-3 px-4 rounded-md border-2 transition-all ${
                      role === "buyer"
                        ? "border-agri-primary bg-agri-primary text-white"
                        : "border-gray-300 hover:border-agri-primary"
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
            <div className="space-y-6">
              <p className="text-gray-600 text-center">
                We've sent a verification code to your phone number. Please enter it below.
              </p>
              
              <div className="flex justify-center space-x-3">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    className="w-12 h-14 text-center text-xl font-semibold border-2 border-gray-300 rounded-md focus:border-agri-primary focus:ring-1 focus:ring-agri-primary outline-none"
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                  />
                ))}
              </div>
              
              <div className="text-center">
                <button
                  type="button"
                  className="text-agri-primary font-medium hover:underline"
                  onClick={() => {/* In a real app, this would resend OTP */}}
                >
                  Resend Code
                </button>
              </div>
            </div>
          )}
          
          <div className="mt-8">
            <button
              type="submit"
              className="agri-button w-full"
              disabled={!isFormValid()}
            >
              {type === "login" ? "Continue" : 
               type === "signup" ? "Create Account" : 
               "Verify & Continue"}
            </button>
          </div>
        </form>
        
        {type === "login" && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                className="text-agri-primary font-medium hover:underline"
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
                className="text-agri-primary font-medium hover:underline"
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
