import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Searchbar = () => {
  return (
    <TextField
      placeholder="Search for Name or Role..."
      variant="outlined"
      size="small"
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
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton sx={{color: 'red'}}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default Searchbar;