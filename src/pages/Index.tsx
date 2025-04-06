
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Welcome from "../components/Welcome";
import Authentication from "../components/Authentication";
import FarmerDashboard from "../components/FarmerDashboard";
import BuyerDashboard from "../components/BuyerDashboard";
import ProfileSection from "../components/ProfileSection";
import TransactionsPage from "../components/TransactionsPage";
import Scanner from "../components/Scanner";
import Layout from "../components/Layout";
import { useUser } from "../context/UserContext";
import { toast } from "../hooks/use-toast";

type Page = "welcome" | "login" | "signup" | "otp" | "dashboard" | "profile" | "transactions" | "scanner";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, userRole, logout } = useUser();
  const [currentPage, setCurrentPage] = useState<Page>("welcome");
  
  // Set the current page based on the URL path and auth state
  useEffect(() => {
    const path = location.pathname.substring(1);
    
    // Protected routes - redirect to welcome if not authenticated
    if (!isAuthenticated && ["dashboard", "profile", "transactions", "scanner"].includes(path)) {
      navigate("/");
      toast({
        title: "Authentication Required",
        description: "Please log in to access this page",
      });
      return;
    }

    // Normal routing
    if (path === "login") {
      setCurrentPage("login");
    } else if (path === "signup") {
      setCurrentPage("signup");
    } else if (path === "otp") {
      setCurrentPage("otp");
    } else if (path === "dashboard") {
      setCurrentPage("dashboard");
    } else if (path === "profile") {
      setCurrentPage("profile");
    } else if (path === "transactions") {
      setCurrentPage("transactions");
    } else if (path === "scanner") {
      setCurrentPage("scanner");
    } else if (path === "") {
      // If authenticated, go to dashboard instead of welcome
      if (isAuthenticated) {
        navigate("/dashboard");
      } else {
        setCurrentPage("welcome");
      }
    }
  }, [location.pathname, isAuthenticated, userRole, navigate]);
  
  // Function to handle navigation between pages
  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    
    // Update the URL
    if (page === "welcome") {
      navigate("/");
    } else {
      navigate(`/${page}`);
    }
  };
  
  // Function to handle auth navigation that's limited to auth pages and dashboard
  const handleAuthNavigation = (page: "login" | "signup" | "otp" | "dashboard" | "welcome") => {
    if (page === "login" || page === "signup" || page === "otp" || page === "dashboard" || page === "welcome") {
      navigateTo(page);
    }
  };
  
  // Function to handle logout
  const handleLogout = () => {
    logout();
    navigateTo("welcome");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
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
        return userRole ? <ProfileSection role={userRole} onLogout={handleLogout} /> : null;
      
      case "transactions":
        return <TransactionsPage />;
        
      case "scanner":
        return <Scanner />;
      
      default:
        return <Welcome />;
    }
  };
  
  // Determine if the navigation should be shown
  const showNavigation = ["dashboard", "profile", "transactions", "scanner"].includes(currentPage) && isAuthenticated;
  
  return (
    <Layout showNavigation={showNavigation} role={userRole}>
      {renderPage()}
    </Layout>
  );
};

export default Index;
