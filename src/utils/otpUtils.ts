
/**
 * Utility functions for OTP generation and verification
 */

// Generate a random n-digit OTP
export const generateOTP = (length: number = 6): string => {
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10).toString();
  }
  return otp;
};

// In a real app, this would be replaced with actual verification logic
// against a backend service that sends and verifies OTPs
export const mockVerifyOTP = (userInputOTP: string, generatedOTP: string): boolean => {
  return userInputOTP === generatedOTP;
};

// Store OTP in session storage to simulate backend storage
export const storeOTP = (phoneNumber: string, otp: string): void => {
  sessionStorage.setItem(`otp_${phoneNumber}`, otp);
};

// Retrieve OTP from session storage
export const retrieveOTP = (phoneNumber: string): string | null => {
  return sessionStorage.getItem(`otp_${phoneNumber}`);
};

// Clear OTP from session storage after verification
export const clearOTP = (phoneNumber: string): void => {
  sessionStorage.removeItem(`otp_${phoneNumber}`);
};
