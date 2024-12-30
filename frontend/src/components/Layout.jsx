import React from "react";
import { Box } from "@mui/material";

const Layout = ({ navbarContent, sidebarContent, mainContent }) => {
  return (
    // Capturing the entire webpage in a box
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#121212", // Dark background color
        color: "#fff", // Text color
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar Section */}
      <Box
        sx={{
          width: "100%",
          height: "60px", // Height of the navbar
          borderBottom: "2px solid #000", // Line below the navbar
          padding: "10px",
          display: "flex",
          position: "fixed", // Fix the navbar
          top: 0,
          zIndex: 1000,
          backgroundColor: "#121212", // Ensure consistent background
        }}
      >
        {navbarContent}
      </Box>

      {/* Main Content Wrapper */}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          marginTop: "60px", // Push below the fixed navbar
        }}
      >
        {/* Sidebar Section */}
        <Box
          sx={{
            width: { xs: "70px", sm: "200px", md: "250px", lg: "300px" }, // Responsive Width of the sidebar
            transition: "all 0.3s ease-in-out", // Transition for responsiveness
            borderRight: "1px solid #3d3d3d", // Line on the right of the sidebar
            padding: "20px",
            position: "fixed", // Fix the sidebar
            top: "60px", // Position below the navbar
            bottom: 0,
            zIndex: 900,
            backgroundColor: "#121212", // Ensure consistent background
            overflowY: "auto", // Scrollable if the sidebar content overflows
          }}
        >
          {sidebarContent}
        </Box>

        {/* Main Content Section */}
        <Box
          sx={{
            flex: 1,
            marginLeft: { xs: "70px", sm: "200px", md: "250px", lg: "300px" }, // Push beside the fixed sidebar
            padding: "20px",
            overflowY: "auto", // Enable scrolling for the main content
            height: "calc(100vh - 60px)", // Full height minus the navbar
            // Styles for the scrollbar
            '&::-webkit-scrollbar': {width: '14px',},
            '&::-webkit-scrollbar-thumb': {backgroundColor: '#808080', borderRadius: '0px'},
            '&::-webkit-scrollbar-thumb:hover': {backgroundColor: '#636363'},
            '&::-webkit-scrollbar-track': {backgroundColor: '#fff', borderRadius: '0px'},
          }}
        >
          {mainContent}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
