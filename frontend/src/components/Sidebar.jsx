import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import CreateProfileModal from "./CreateProfileModal";
import RecentActorsOutlinedIcon from "@mui/icons-material/RecentActorsOutlined";

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
        flexDirection: { xs: "row", sm: "column" },
        justifyContent: "space-around",
        height: "100%",
        bgcolor: "#121212", // Optional: Dark theme
        overflow: "hidden",
      }}
    >
      {/* Fixed "Create" Button */}
      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <CreateProfileModal />
      </Box>

      {/* Scrollable Category Buttons (XS) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", sm: "column" },
          overflowX: { xs: "auto", sm: "hidden" },
          overflowY: "hidden",
          gap: { xs: "0px", sm: "10px" },
          flexWrap: { xs: "nowrap", sm: "wrap" }, // Prevent wrap on XS
        }}
      >
        {categories.map((category, index) => (
          <Button
            key={index}
            onClick={() => setSelectedCategory(category.label)}
            variant="outlined"
            size="small"
            sx={{
              flexShrink: 0,
              minWidth: { xs: "80px", sm: "100%" },
              color: "#fff",
              backgroundColor:
                selectedCategory === category.label ? "#333" : "transparent",
              borderColor:
                selectedCategory === category.label ? "#fff" : "transparent",
              "&:hover": {
                backgroundColor:
                  selectedCategory === category.label ? "#444" : "#222",
              },
              justifyContent: "flex-start",
              paddingLeft: "20px",
              borderRadius: "20px",
              marginBottom: { xs: "0px", sm: "10px" }, // Restore spacing on larger screens
            }}
          >
            <span
              style={{
                marginRight: "15px",
                color:
                  selectedCategory === category.label ? "#fff" : "#ff0000",
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
          display: { xs: "none", sm: "block" },
        }}
      >
        Profiles, reimagined with Cardify
      </Typography>
    </Box>
  );
};

export default Sidebar;