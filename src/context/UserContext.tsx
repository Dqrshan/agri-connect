
import React, { createContext, useState, useContext, ReactNode } from 'react';

type UserRole = 'farmer' | 'buyer' | null;

interface UserContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  phoneNumber: string;
  fullName: string;
  state: string;
  city: string;
  login: (phoneNumber: string, role: UserRole, name?: string, state?: string, city?: string) => void;
  logout: () => void;
}

const defaultContext: UserContextType = {
  isAuthenticated: false,
  userRole: null,
  phoneNumber: '',
  fullName: '',
  state: '',
  city: '',
  login: () => {},
  logout: () => {},
};

const UserContext = createContext<UserContextType>(defaultContext);

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  // Load from localStorage on startup
  React.useEffect(() => {
    const storedIsAuth = localStorage.getItem('isAuthenticated');
    const storedRole = localStorage.getItem('userRole') as UserRole;
    const storedPhone = localStorage.getItem('phoneNumber');
    const storedName = localStorage.getItem('fullName');
    const storedState = localStorage.getItem('state');
    const storedCity = localStorage.getItem('city');

    if (storedIsAuth === 'true' && storedRole && storedPhone) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
      setPhoneNumber(storedPhone);
      
      if (storedName) setFullName(storedName);
      if (storedState) setState(storedState);
      if (storedCity) setCity(storedCity);
    }
  }, []);

  const login = (
    phone: string, 
    role: UserRole, 
    name: string = '', 
    userState: string = '', 
    userCity: string = ''
  ) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setPhoneNumber(phone);
    
    if (name) setFullName(name);
    if (userState) setState(userState);
    if (userCity) setCity(userCity);

    // Save to localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role || '');
    localStorage.setItem('phoneNumber', phone);
    if (name) localStorage.setItem('fullName', name);
    if (userState) localStorage.setItem('state', userState);
    if (userCity) localStorage.setItem('city', userCity);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setPhoneNumber('');
    setFullName('');
    setState('');
    setCity('');

    // Clear from localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('fullName');
    localStorage.removeItem('state');
    localStorage.removeItem('city');
  };

  const value = {
    isAuthenticated,
    userRole,
    phoneNumber,
    fullName,
    state,
    city,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
