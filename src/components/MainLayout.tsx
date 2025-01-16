import React, { useState, useEffect } from "react";
import { Box } from "@mantine/core";
import { HeaderSearch } from "../components/Header/HeaderSearch";
import { NavbarNested } from "../components/Navbar/NavbarNested";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";

// Define the props type
interface MainLayoutProps {
  isNavbarOpen: boolean;
  toggleNavbar: () => void;
}

export function MainLayout({ isNavbarOpen, toggleNavbar }: MainLayoutProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Track if it's mobile screen

  // Update the screen size on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close navbar when a navbar option is clicked (for mobile screens)
  const handleNavbarItemClick = () => {
    if (isMobile) {
      toggleNavbar(); // Close navbar on mobile
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
        padding :"15px 0px",
       
      }}
    >
      {/* Fixed Header */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: "white",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <HeaderSearch toggleNavbar={toggleNavbar} isNavbarOpen={isNavbarOpen} />
      </Box>

      {/* Fixed Navbar */}
      <Box
        sx={{
          position: "fixed",
          top: "60px",
          left: 0,
          bottom: 0,
          width: isNavbarOpen ? "250px" : "0", 
          transition: "width 0.3s ease", // Smooth transition for opening/closing
          zIndex: 999,
          backgroundColor: "white",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Optional shadow

          // Mobile behavior: Navbar as an overlay
          "@media (max-width: 768px)": {
            position: "fixed",
            top: "60px", // Keep space for header
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1001, // Ensure navbar is above main content
            backgroundColor: "white",
            width: isNavbarOpen ? "100%" : "0", // Full width on mobile
            transition: "width 0.3s ease",
          },
        }}
      >
        {isNavbarOpen && (
          <NavbarNested
            isOpen={isNavbarOpen}
            onItemClick={handleNavbarItemClick}  // Pass onItemClick prop
          />
        )}
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          marginTop: "60px", // Adjust for header height
          transition: "margin-left 0.3s ease", 
          paddingLeft: isNavbarOpen && !isMobile ? "250px" : 0, 
          marginBottom :"20px",

          // Mobile behavior: Main content stays in place
          "@media (max-width: 768px)": {
            marginTop: "60px", 
            paddingLeft: "0", 
            transition: "none", 
          },
        }}
      >
        <Outlet />
      
        
      </Box>
      <Footer/>
    </Box>
  );
}
