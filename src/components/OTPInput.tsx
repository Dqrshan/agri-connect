
import React, { useEffect, useRef, useState } from 'react';

interface OTPInputProps {
  length: number;
  value: string[];
  onChange: (value: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, value, onChange }) => {
  const [otp, setOtp] = useState<string[]>(value);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus the first empty input or the last input if all filled
    const focusIndex = otp.findIndex(val => val === '') || length - 1;
    inputRefs.current[focusIndex]?.focus();
  }, [otp, length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    
    // Only allow one digit
    if (val.length > 1) return;
    
    // Only allow digits
    if (val && !/^\d+$/.test(val)) return;
    
    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    
    // Combine values and call onChange
    onChange(newOtp.join(''));
    
    // If we entered a value, focus the next input
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // If backspace and input is empty, focus previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    // If pasted data is not all digits or wrong length, ignore
    if (!/^\d+$/.test(pastedData)) return;
    
    // Fill as many slots as we can
    const newOtp = [...otp];
    const pastedChars = pastedData.split('');
    
    for (let i = 0; i < Math.min(length, pastedChars.length); i++) {
      newOtp[i] = pastedChars[i];
    }
    
    setOtp(newOtp);
    onChange(newOtp.join(''));
    
    // Focus the next empty input or the last one
    const focusIndex = newOtp.findIndex(val => val === '');
    inputRefs.current[focusIndex !== -1 ? focusIndex : length - 1]?.focus();
  };

  return (
    <div className="flex justify-between space-x-2">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={el => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otp[index] || ''}
          onChange={e => handleChange(e, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-xl bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label={`Digit ${index + 1} of OTP`}
        />
      ))}
    </div>
  );
};

export default OTPInput;
