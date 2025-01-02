import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import CreateProfileModal from "./CreateProfileModal";
import RecentActorsOutlinedIcon from '@mui/icons-material/RecentActorsOutlined';

const categories = [
  { label: "All", icon: <RecentActorsOutlinedIcon /> },
  { label: "Work", icon: <WorkIcon /> },
  { label: "Personal", icon: <PersonIcon /> },
  { label: "Business", icon: <BusinessIcon /> },
  { label: "Friends", icon: <PeopleIcon /> },
];

const Sidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        bgcolor: "#121212", // Optional: Dark theme
      }}
    >
      {/* Top Section with "Create" Button */}
      <Box>
        {/* file for create profile button */}
        <CreateProfileModal />

        {/* Category Navigation Buttons */}
        {categories.map((category, index) => (
          <Button
            key={index}
            onClick={() => setSelectedCategory(category.label)}
            variant="outlined"
            size="small"
            sx={{
              width: "100%",
              marginBottom: "10px",
              color: "#fff", // Button text remains white
              backgroundColor:
                selectedCategory === category.label ? "#333" : "transparent", // Background for selected button
              borderColor:
                selectedCategory === category.label ? "#fff" : "transparent", // Borderline for selected button
              "&:hover": {
                backgroundColor: selectedCategory === category.label ? "#444" : "#222",
              },
              justifyContent: "flex-start",
              paddingLeft: "20px",
              borderRadius: "20px",
            }}
          >
            <span
              style={{
                marginRight: "15px",
                color: selectedCategory === category.label ? "#fff" : "#ff0000", // Icon color changes dynamically
              }}
            >
              {category.icon}
            </span>
            {category.label}
          </Button>
        ))}
      </Box>

      {/* Bottom Section with Tagline */}
        <Typography
          variant="caption"
          align="center"
          sx={{
            color: "#bbb",
            marginTop: "30px",
            display: { xs:'none', sm:'block' },
          }}
        >
          Profiles, reimagined with Cardify
        </Typography>
    </Box>
  );
};

export default Sidebar;
