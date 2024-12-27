import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Searchbar from "./Searchbar"; // Import the SearchBar component

const Navbar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%", // Matches the height defined in Layout
        backgroundColor: "#1e1e1e", // Slightly lighter background color for navbar
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // Space between left, middle, and right sections
        padding: "0 20px", // Padding for some spacing
      }}
    >
      {/* Project Name */}
      <Typography
        variant="h6"
        sx={{
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Project Name
      </Typography>

      {/* Search Box */}
      <Box sx={{ width: "40%" }}> {/* Container for the search bar , adjust the width of searchbox  */} 
        <Searchbar />
      </Box>

      {/* Button */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#3f51b5", // Button color
          color: "#fff",
          textTransform: "none", // Prevents uppercase text
          "&:hover": {
            backgroundColor: "#303f9f", // Darker shade on hover
          },
        }}
      >
        dark/light mode
      </Button>
    </Box>
  );
};

export default Navbar;