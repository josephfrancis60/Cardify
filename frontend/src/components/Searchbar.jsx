import React, { useState } from "react";
import { TextField, InputAdornment, IconButton, Snackbar, Alert } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { BASE_URL } from "../App";

const Searchbar = ({ setUsers, selectedCategory }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false); // snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const [searchQuery, setSearchQuery] = useState(""); // track search query

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSnackbarMessage("Search box is empty."); // Snackbar message for empty query
      setOpenSnackbar(true);
      return; // Do nothing if search query is empty
    }

    try {
      const response = await fetch(
        `${BASE_URL}/profiles/search?search=${searchQuery}&category=${selectedCategory}`,
        {
          method: "GET",
        }
      );
      const result = await response.json();

      if (response.ok) {
        setUsers(result); // Set the profiles based on search results
        setSearchQuery(""); // Clear search query after successful search
      } else {
        setUsers([]); // Clear profiles if no results found
        setSnackbarMessage(result.message || "No profile found!"); // Display backend error message
        setOpenSnackbar(true);
        setSearchQuery("");
      }
    } catch (error) {
      console.error("Error fetching profiles via search", error);
      setUsers([]); // Handle error by clearing profiles
      setSnackbarMessage("An error occurred. Please try again."); // Error message for failures
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <TextField
        placeholder="Search for Name or Role..."
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update the search query based on input change
        sx={{
          backgroundColor: "#fff",
          borderRadius: "20px",
          height: "35px", // Custom height
          width: "100%",
          "& .MuiOutlinedInput-root": {
            height: "35px", // Ensure input field matches custom height
            padding: "0", // Removes extra padding
            borderRadius: "20px", // Ensure rounded corners
          },
          "& .MuiInputBase-input": {
            padding: "8px 16px", // Adjust padding inside the field
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent", // Remove border by default
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent", // Remove border on hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent", // Remove border when focused
          },
          "& .MuiOutlinedInput-root.Mui-focused": {
            boxShadow: "none", // Remove the blue shadow on focus
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch} sx={{ color: "red" }}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarMessage.includes("found") ? "info" : "warning"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Searchbar;