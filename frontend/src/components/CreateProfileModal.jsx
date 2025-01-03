import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Box, Radio, RadioGroup, FormControlLabel, FormLabel } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import cardemoji from '../assets/icons/card_emoji.png'; 

const CreateProfileModal = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    description: "",
    gender: "", // This will store the selected gender
    socialLinks: ["", "", "", ""],
    categories: [], // This will store selected categories
  });

  // Open/close dialog handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle text field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle social link changes
  const handleSocialLinkChange = (index, value) => {
    const updatedLinks = [...formData.socialLinks];
    updatedLinks[index] = value;
    setFormData({ ...formData, socialLinks: updatedLinks });
  };

  // Handle category selection toggle
  const toggleCategory = (category) => {
    const updatedCategories = [...formData.categories];
    if (updatedCategories.includes(category)) {
      // If category is already selected, remove it
      setFormData({
        ...formData,
        categories: updatedCategories.filter((item) => item !== category),
      });
    } else {
      // If category is not selected, add it
      setFormData({ ...formData, categories: [...updatedCategories, category] });
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Profile Created:", formData);
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        size="medium"
        startIcon={<AddToPhotosOutlinedIcon />}
        onClick={handleOpen}
        sx={{
          width: {xs: "auto", sm: "150px"},
          height: {xs: "40px", sm: "50px"},
          marginY: {xs: "0", sm: "10px"},
          marginRight:{ xs: "10px", sm: "0" },
          backgroundColor: "#ff0000",
          "&:hover": { backgroundColor: "#f53838" },
          textTransform: "none",
          fontWeight: "bold",
          fontSize: "19px",
          borderRadius: '10px',
        }}
      >
        Create
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: "bold", fontFamily: '"Roboto", sans-serif' }}>
          <Box>
            My New Profile Card
            <img src={cardemoji} alt="card_emoji" style={{height:20, width:20, marginLeft:10,}} />
          </Box>
          <Box>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {/* Full Name and Role (Same Row) */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <TextField
              label="Full Name"
              name="fullName"
              placeholder="John Doe"
              fullWidth
              value={formData.fullName}
              onChange={handleChange}
              sx={{ fontFamily: '"Roboto", sans-serif' }}
            />
            <TextField
              label="Role"
              name="role"
              placeholder="Software Developer"
              fullWidth
              value={formData.role}
              onChange={handleChange}
              sx={{ fontFamily: '"Roboto", sans-serif' }}
            />
          </div>

          {/* Description */}
          <TextField
            label="Description"
            name="description"
            placeholder="He is a Software Developer who loves to code and build things"
            multiline
            rows={3}
            fullWidth
            value={formData.description}
            onChange={handleChange}
            sx={{
              marginBottom: "16px",
              fontFamily: '"Roboto", sans-serif',
            }}
          />

          {/* Gender Selection */}
          <Box sx={{ marginBottom: "16px", fontFamily: '"Roboto", sans-serif' }}>
            <FormLabel component="legend" >Gender</FormLabel>
            <RadioGroup
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              sx={{ display: "flex", flexDirection: "row", gap: "16px" }}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
            </RadioGroup>
          </Box>

          {/* Social Links */}
          {formData.socialLinks.map((link, index) => {
            const socialLinkLabels = ["Gmail URL", "LinkedIn URL", "Twitter URL", "Facebook URL"];
            return (
              <TextField
                key={index}
                label={socialLinkLabels[index]} // Use the corresponding label
                fullWidth
                value={link}
                onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                sx={{
                  marginBottom: "8px",
                  fontFamily: '"Roboto", sans-serif',
                }}
              />
            );
          })}

          {/* Add Categories Section */}
          <Box sx={{ marginTop: "16px", marginBottom: "16px", fontFamily: '"Roboto", sans-serif' }}>
            <Box sx={{ fontWeight: "bold", marginBottom: "8px" }}>Add Categories</Box>
            <Box sx={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
              {["Work", "Personal", "Business", "Friends"].map((category) => (
                <Button
                  key={category}
                  variant="outlined"
                  color={formData.categories.includes(category) ? "error" : "default"}
                  onClick={() => toggleCategory(category)}
                  sx={{
                    borderColor: formData.categories.includes(category) ? "red" : "lightgrey",
                    backgroundColor: formData.categories.includes(category) ? "red" : "transparent",
                    color: formData.categories.includes(category) ? "white" : "black",
                    borderRadius: "20px",
                    fontFamily: '"Roboto", sans-serif',
                    "&:hover": {
                      borderColor: formData.categories.includes(category) ? "transparent" : "grey",
                      backgroundColor: formData.categories.includes(category) ? "#eb2b21" : "#D3D3D3",
                    },
                  }}
                >
                  {category}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Selected Categories Box */}
          <Box
            sx={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
              marginBottom: "16px",
              fontFamily: '"Roboto", sans-serif',
            }}
          >
            <Box sx={{ fontWeight: "bold", marginBottom: "8px", color: "grey" }}>Selected Categories</Box>
            {formData.categories.length === 0 ? (
              <Box sx={{ color: "grey" }}>No categories selected</Box>
            ) : (
              <Box>{formData.categories.join(", ")}</Box>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary" sx={{ fontFamily: '"Roboto", sans-serif' }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#ff0000",
              "&:hover": { backgroundColor: "#c00000" },
              fontFamily: '"Roboto", sans-serif',
            }}
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateProfileModal;