
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Welcome from "../components/Welcome";
import Authentication from "../components/Authentication";
import FarmerDashboard from "../components/FarmerDashboard";
import BuyerDashboard from "../components/BuyerDashboard";
import ProfileSection from "../components/ProfileSection";
import Layout from "../components/Layout";

type Page = "welcome" | "login" | "signup" | "otp" | "dashboard" | "profile" | "transactions";
type UserRole = "farmer" | "buyer" | null;

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<Page>("welcome");
  const [userRole, setUserRole] = useState<UserRole>(null);
  
  // Set the current page based on the URL path
  useEffect(() => {
    const path = location.pathname.substring(1);
    
    if (path === "login") {
      setCurrentPage("login");
    } else if (path === "signup") {
      setCurrentPage("signup");
    } else if (path === "dashboard") {
      setCurrentPage("dashboard");
      if (!userRole) setUserRole("farmer"); // Default for demo
    } else if (path === "profile") {
      setCurrentPage("profile");
    } else if (path === "transactions") {
      setCurrentPage("transactions");
    } else if (path === "") {
      setCurrentPage("welcome");
    }
  }, [location.pathname, userRole]);
  
  // Function to handle navigation between pages
  const navigateTo = (page: Page, role?: UserRole) => {
    setCurrentPage(page);
    if (role) setUserRole(role);
    
    // Update the URL
    if (page === "welcome") {
      navigate("/");
    } else {
      navigate(`/${page}`);
    }
    
    // This is a mock implementation
    // In a real app, we would store the authenticated user in a global state
    if (page === "dashboard" && !userRole) {
      // For demo purposes, if not set explicitly, default to farmer
      setUserRole("farmer");
    }
  };
  
  // Function to handle auth navigation that's limited to auth pages and dashboard
  const handleAuthNavigation = (page: "login" | "signup" | "otp" | "dashboard") => {
    if (page === "login" || page === "signup" || page === "otp" || page === "dashboard") {
      navigateTo(page);
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
            onNavigate={handleAuthNavigation} 
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
  const showNavigation = ["dashboard", "profile", "transactions"].includes(currentPage) && userRole !== null;
  
  return (
    <Layout showNavigation={showNavigation} role={userRole}>
      {renderPage()}
    </Layout>
  );
};

export default Index;
