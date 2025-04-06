
import React, { ReactNode } from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
  role?: "farmer" | "buyer" | null;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showNavigation = false, 
  role = null 
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-agri-background">
      <main className="flex-1 container mx-auto px-4 py-6 mb-16">
        {children}
      </main>
      
      {showNavigation && role && (
        <Navigation role={role} />
      )}
    </div>
  );
};

export default Layout;
