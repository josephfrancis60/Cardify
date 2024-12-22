import React from "react";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { useState } from "react";

const Sidebar = ({ onCategorySelect }) => {
  const [activeCategory, setActiveCategory] = useState("all");

  // Define categories
  const categories = ["all", "work", "personal", "family", "friends"];

  // Handle category click
  const handleCategoryClick = (category) => {
    setActiveCategory(category); // Highlight active category
    onCategorySelect(category); // Pass selected category to parent component
  };

  return (
    <Box
      sx={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
        Profile Categories
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem key={category} sx={{ padding: 0 }}>
            <Button
              variant={activeCategory === category ? "contained" : "text"}
              color={activeCategory === category ? "primary" : "default"}
              fullWidth
              onClick={() => handleCategoryClick(category)}
              sx={{
                justifyContent: "flex-start",
                textTransform: "capitalize",
                marginBottom: "0.5rem",
              }}
            >
              {category}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;