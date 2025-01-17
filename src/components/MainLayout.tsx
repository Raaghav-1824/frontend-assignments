import React, { useState, useEffect } from "react";
import { Box, Button } from "@mantine/core";
import { HeaderSearch } from "../components/Header/HeaderSearch";
import { NavbarNested } from "../components/Navbar/NavbarNested";
import { Outlet, useNavigate } from "react-router-dom"; // useNavigate for back functionality
import Footer from "./Footer/Footer";

// Define the props type
interface MainLayoutProps {
  isNavbarOpen: boolean;
  toggleNavbar: () => void;
}

export function MainLayout({ isNavbarOpen, toggleNavbar }: MainLayoutProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 
  const navigate = useNavigate(); // Hook for navigation

  // Hardcoded username (replace with dynamic user data as needed)
  const username = "John Doe";

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

  // Back button functionality
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        paddingTop: "30px",
      }}
    >
      {/* Header */}
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

      {/* Back Button */}
      <Button
        onClick={handleBackClick}
        sx={{
          position: "fixed",
          top: "15px",
          left: "15px",
          padding: "5px 10px",
          fontSize: "14px", // Font size to make it look clean
          borderRadius: "8px", // Rounded corners
          transition: "all 0.3s ease", // Smooth transition
          backgroundColor: "#007bff", // Button color
          color: "#fff", // Text color
          "&:hover": {
            backgroundColor: "#0056b3", // Darker on hover
          },
        }}
      >
        Back
      </Button>

      {/* Navbar */}
      <Box
        sx={{
          position: "fixed",
          top: "60px",
          left: 0,
          bottom: 0,
          width: isNavbarOpen ? "250px" : "0",
          transition: "width 0.3s ease",
          zIndex: 999,
          backgroundColor: "white",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          "@media (max-width: 768px)": {
            position: "fixed",
            top: "60px",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1001,
            backgroundColor: "white",
            width: isNavbarOpen ? "100%" : "0",
            transition: "width 0.3s ease",
          },
        }}
      >
        {isNavbarOpen && (
          <NavbarNested
            isOpen={isNavbarOpen}
            onItemClick={handleNavbarItemClick}
            username={username} // Pass username here
          />
        )}
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          marginTop: "60px",
          marginBottom: "30px",
          transition: "margin-left 0.3s ease",
          paddingLeft: isNavbarOpen && !isMobile ? "250px" : 0,
          "@media (max-width: 768px)": {
            marginTop: "60px",
            paddingLeft: "0",
            transition: "none",
          },
        }}
      >
        <Outlet />
      </Box>

      {/* Footer */}
      <Box
        sx={{
          marginTop: "auto",
          backgroundColor: "#f8f9fa",
          padding: "15px",
          textAlign: "center",
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
}
