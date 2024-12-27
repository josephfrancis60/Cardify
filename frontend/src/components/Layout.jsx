import React from "react";
import { Box } from "@mui/material";

const Layout = ({ navbarContent, sidebarContent, mainContent }) => {
  return (
    // capturing the entire webpage in a box 
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
          borderBottom: "2px solid #fff", // Line below the navbar
          padding: "10px",
          display: "flex",
        }}
      >
        {navbarContent}
      </Box>

      {/* Main Content Wrapper */}
      <Box sx={{ display: "flex", flex: 1 }}>
        {/* Sidebar Section */}
        <Box
          sx={{
            width: { xs:'70px', sm:'200px', md:'250px', lg:'300px' }, // Responsive Width of the sidebar
            transition: "all 0.3s ease-in-out",  // transistion for responsiveness
            borderRight: "2px solid #fff", // Line on the right of the sidebar
            padding: "20px",
          }}
        >
          {sidebarContent}
        </Box>

        {/* Main Content Section */}
        <Box
          sx={{
            flex: 1,
            padding: "20px",
          }}
        >
          {mainContent}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;