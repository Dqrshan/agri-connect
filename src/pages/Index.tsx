
import React, { useState } from "react";
import Welcome from "../components/Welcome";
import Authentication from "../components/Authentication";
import FarmerDashboard from "../components/FarmerDashboard";
import BuyerDashboard from "../components/BuyerDashboard";
import ProfileSection from "../components/ProfileSection";
import Layout from "../components/Layout";

type Page = "welcome" | "login" | "signup" | "otp" | "dashboard" | "profile";
type UserRole = "farmer" | "buyer" | null;

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>("welcome");
  const [userRole, setUserRole] = useState<UserRole>(null);
  
  // Function to handle navigation between pages
  const navigateTo = (page: Page, role?: UserRole) => {
    setCurrentPage(page);
    if (role) setUserRole(role);
    
    // This is a mock implementation
    // In a real app, we would store the authenticated user in a global state
    if (page === "dashboard" && !userRole) {
      // For demo purposes, if not set explicitly, default to farmer
      setUserRole("farmer");
    }
  };
  
  // Function to render the current page content
  const renderPage = () => {
    switch (currentPage) {
      case "welcome":
        return <Welcome />;
      
      case "login":
      case "signup":
      case "otp":
        return (
          <Authentication 
            type={currentPage} 
            onNavigate={(page: any) => {
              if (page === "dashboard") {
                // For demo purposes
                const role = Math.random() > 0.5 ? "farmer" : "buyer";
                navigateTo(page, role);
              } else {
                navigateTo(page);
              }
            }} 
          />
        );
      
      case "dashboard":
        return userRole === "farmer" ? (
          <FarmerDashboard />
        ) : (
          <BuyerDashboard />
        );
      
      case "profile":
        return userRole ? <ProfileSection role={userRole} /> : null;
      
      default:
        return <Welcome />;
    }
  };
  
  // Determine if the navigation should be shown
  const showNavigation = ["dashboard", "profile"].includes(currentPage) && userRole !== null;
  
  return (
    <Layout showNavigation={showNavigation} role={userRole}>
      {renderPage()}
    </Layout>
  );
};

export default Index;
