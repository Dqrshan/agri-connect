
import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { generateOTP, storeOTP, retrieveOTP, mockVerifyOTP, clearOTP } from "../utils/otpUtils";
import { useUser } from "../context/UserContext";
import OTPInput from "./OTPInput";
import { toast } from "../hooks/use-toast";

interface AuthProps {
  type: "login" | "signup" | "otp";
  onNavigate: (page: "login" | "signup" | "otp" | "dashboard" | "welcome") => void;
}

interface UserProfile {
  phoneNumber: string;
  fullName: string;
  state: string;
  city: string;
  role: "farmer" | "buyer";
  createdAt: string;
}

const Authentication: React.FC<AuthProps> = ({ type, onNavigate }) => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState<"farmer" | "buyer" | "">("");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [sentOTP, setSentOTP] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Load from session storage for navigation between auth screens
  useEffect(() => {
    const storedPhone = sessionStorage.getItem("auth_phone");
    const storedName = sessionStorage.getItem("auth_name");
    const storedState = sessionStorage.getItem("auth_state");
    const storedCity = sessionStorage.getItem("auth_city");
    const storedRole = sessionStorage.getItem("auth_role") as "farmer" | "buyer" | "";
    
    if (storedPhone) setPhoneNumber(storedPhone);
    if (storedName) setFullName(storedName);
    if (storedState) setState(storedState);
    if (storedCity) setCity(storedCity);
    if (storedRole) setRole(storedRole);
  }, []);
  
  // Save to session storage for navigation between auth screens
  useEffect(() => {
    if (phoneNumber) sessionStorage.setItem("auth_phone", phoneNumber);
    if (fullName) sessionStorage.setItem("auth_name", fullName);
    if (state) sessionStorage.setItem("auth_state", state);
    if (city) sessionStorage.setItem("auth_city", city);
    if (role) sessionStorage.setItem("auth_role", role);
  }, [phoneNumber, fullName, state, city, role]);

  // Store user profile in localStorage
  const storeUserProfile = (user: UserProfile) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUserIndex = users.findIndex((u: UserProfile) => u.phoneNumber === user.phoneNumber);
    
    if (existingUserIndex >= 0) {
      users[existingUserIndex] = user; // Update existing user
    } else {
      users.push(user); // Add new user
    }
    
    localStorage.setItem("users", JSON.stringify(users));
  };

  // Retrieve user profile from localStorage
  const getUserProfile = (phone: string): UserProfile | null => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return users.find((user: UserProfile) => user.phoneNumber === phone) || null;
  };

  const handleOtpChange = (value: string) => {
    setOtp(value.split("").concat(Array(6 - value.length).fill("")));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      if (type === "login") {
        // Check if user exists
        const user = getUserProfile(phoneNumber);
        if (!user) {
          toast({
            title: "User Not Found",
            description: "No account found with this phone number. Please sign up.",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }

        // Generate and send OTP
        const newOTP = generateOTP();
        storeOTP(phoneNumber, newOTP);
        setSentOTP(newOTP);
        console.log(`Generated OTP for login: ${newOTP}`);
        toast({
          title: "OTP Sent",
          description: `OTP has been sent to ${phoneNumber}. For demo: ${newOTP}`,
        });
        onNavigate("otp");
      } 
      else if (type === "signup") {
        // Check if user already exists
        if (getUserProfile(phoneNumber)) {
          toast({
            title: "Account Exists",
            description: "An account with this phone number already exists. Please login.",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }

        // Generate and send OTP
        const newOTP = generateOTP();
        storeOTP(phoneNumber, newOTP);
        setSentOTP(newOTP);
        console.log(`Generated OTP for signup: ${newOTP}`);
        toast({
          title: "OTP Sent",
          description: `OTP has been sent to ${phoneNumber}. For demo: ${newOTP}`,
        });
        onNavigate("otp");
      } 
      else if (type === "otp") {
        const inputOTP = otp.join("");
        const storedOTP = retrieveOTP(phoneNumber);
        
        if (mockVerifyOTP(inputOTP, storedOTP || sentOTP)) {
          // OTP is valid, authenticate the user
          if (!role) {
            // For login flow, get role from stored profile
            const user = getUserProfile(phoneNumber);
            if (!user) {
              toast({
                title: "Error",
                description: "User profile not found",
                variant: "destructive",
              });
              setIsSubmitting(false);
              return;
            }
            
            login(
              phoneNumber, 
              user.role,
              user.fullName,
              user.state,
              user.city
            );
          } else {
            // For signup flow, create new profile
            const newUser: UserProfile = {
              phoneNumber,
              fullName,
              state,
              city,
              role: role as "farmer" | "buyer",
              createdAt: new Date().toISOString()
            };
            
            storeUserProfile(newUser);
            login(
              phoneNumber, 
              role as "farmer" | "buyer",
              fullName,
              state,
              city
            );
          }
          
          // Clear the OTP and session data
          clearOTP(phoneNumber);
          sessionStorage.removeItem("auth_phone");
          sessionStorage.removeItem("auth_name");
          sessionStorage.removeItem("auth_state");
          sessionStorage.removeItem("auth_city");
          sessionStorage.removeItem("auth_role");
          
          toast({
            title: "Success",
            description: "You have been successfully authenticated",
          });
          
          // Navigate to dashboard
          onNavigate("dashboard");
        } else {
          toast({
            title: "Invalid OTP",
            description: "The OTP you entered is incorrect. Please try again.",
            variant: "destructive",
          });
        }
      }
      setIsSubmitting(false);
    }, 1000); // Simulate network delay
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
      return otp.join("").length === 6;
    }
    return false;
  };
  
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mb-6 flex items-center">
        <button 
          onClick={() => onNavigate(type === "otp" ? (phoneNumber ? "login" : "signup") : "welcome")} 
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
          <div className="mb-8 text-center">
            <div className="h-16 w-16 rounded-full bg-indigo-500 flex items-center justify-center text-white text-2xl font-bold mx-auto">
              {fullName ? fullName.charAt(0).toUpperCase() : "A"}
            </div>
            <h2 className="text-xl font-bold mt-4">Verification Code</h2>
            <p className="text-gray-500 mt-1">
              We have sent a verification code to your phone number
            </p>
            <p className="text-gray-800 font-medium mt-2">{phoneNumber}</p>
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
            <div className="space-y-6">
              <p className="text-sm text-gray-600 mb-4">Enter the 6-digit code</p>
              
              <OTPInput 
                length={6} 
                value={otp} 
                onChange={handleOtpChange} 
              />
              
              <div className="text-center mt-4">
                <p className="text-sm text-gray-500">
                  Didn't receive code?{" "}
                  <button
                    type="button"
                    className="text-indigo-600 font-medium"
                    onClick={() => {
                      const newOTP = generateOTP();
                      storeOTP(phoneNumber, newOTP);
                      setSentOTP(newOTP);
                      console.log(`Resent OTP: ${newOTP}`);
                      toast({
                        title: "OTP Resent",
                        description: `New OTP has been sent. For demo: ${newOTP}`,
                      });
                    }}
                  >
                    Resend
                  </button>
                </p>
              </div>
            </div>
          )}
          
          <div className="mt-8">
            <button
              type="submit"
              className={`w-full py-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={!isFormValid() || isSubmitting}
            >
              {isSubmitting ? (
                <span className="inline-flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                type === "login" ? "Log In" : 
                type === "signup" ? "Sign Up" : 
                "Verify"
              )}
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
