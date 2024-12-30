import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

const EditProfileModal = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "John Doe", // Pre-filled data for editing
    role: "Software Developer",
    description: "Passionate developer who builds amazing things.",
    socialLinks: ["", "", "", ""],
    categories: ["Work"], // Example pre-selected category
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
      setFormData({
        ...formData,
        categories: updatedCategories.filter((item) => item !== category),
      });
    } else {
      setFormData({ ...formData, categories: [...updatedCategories, category] });
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Profile Edited:", formData);
    handleClose();
  };

  return (
    <>
      <IconButton
        color="primary"
        aria-label="edit"
        onClick={handleOpen}
        sx={{ width: 30, height: 30 }}
      >
        <EditIcon sx={{ color: "#fff", fontSize: "20px" }} />
      </IconButton>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: "bold", fontFamily: '"Roboto", sans-serif' }}>
          Edit Profile
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* Full Name and Role (Same Row) */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <TextField
              label="Full Name"
              name="fullName"
              fullWidth
              value={formData.fullName}
              onChange={handleChange}
              sx={{ fontFamily: '"Roboto", sans-serif' }}
            />
            <TextField
              label="Role"
              name="role"
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

          {/* Social Links */}
          {formData.socialLinks.map((link, index) => {
            const socialLinkLabels = ["Gmail URL", "LinkedIn URL", "Twitter URL", "Facebook URL"];
            return (
              <TextField
                key={index}
                label={socialLinkLabels[index]}
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
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditProfileModal;