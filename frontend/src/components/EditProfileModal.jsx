import React, { useState } from "react";
import { Box, Button, Grid, Typography, IconButton, Modal, TextField, Chip } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close'; // Close icon for the modal



const EditProfileModal = () => {

  const [open, setOpen] = useState(false); // Modal open state

  const [selectedCategories, setSelectedCategories] = useState([]);
  

  const handleOpen = () => setOpen(true); // open the Modal
  const handleClose = () => setOpen(false);  // close the Modal

  // Handle category button click
  const handleCategoryClick = (category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Handle chip delete
  const handleRemoveCategory = (category) => {
    const updatedCategories = selectedCategories.filter(
      (item) => item !== category
    );
    setSelectedCategories(updatedCategories);
  };
  

  return (
    <>
      <IconButton
        color="primary"
        aria-label="edit"
        onClick={handleOpen}
        sx={{ width: 30, height: 30 }}
      >
        <EditOutlinedIcon sx={{ color: "#fff", fontSize: "20px" }} />
      </IconButton>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}  // closes modal without clearing inputs if any
        aria-labelledby="edit-profile-modal"
        aria-describedby="edit-profile-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            padding: 1,
            borderRadius: 2,
            maxHeight: '80vh', // Set max height for the modal
            display: 'flex',
            flexDirection: 'column',
          }}  
        >
          {/* Fixed Header */}
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              bgcolor: 'background.paper',
              zIndex: 1,
              padding: 2,
              borderBottom: '1px solid rgb(247, 240, 240)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 50,
              borderRadius: '0px',
            }}
          >
            <Typography variant="h6" fontWeight='bold' color='rgb(247, 50, 50)' >Edit Profile Card</Typography>
            <IconButton onClick={handleClose} sx={{ color: 'rgb(110, 103, 103)' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Scrollable content */}
          <Box
            sx={{
              padding: 3,
              overflowY: 'auto', // Enable scrolling for the content
              flex: 1, // Allow the content area to grow and scroll
              // Styles for the scrollbar
              "&::-webkit-scrollbar": { width: {xs: "0px", sm:"7px"} },  // no scrollbar in xs screen size
              "&::-webkit-scrollbar-thumb": { backgroundColor: "#FF6961", borderRadius: "10px", },
              "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#636363" },
              "&::-webkit-scrollbar-track": { backgroundColor: "#fff", borderRadius: "10px" },
            }}
          >
            {/* Name and Role in the same row */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Name"
                  placeholder='John Doe'
                  variant="outlined"
                  color='secondary'
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Role"
                  placeholder='Analyst'
                  variant="outlined"
                  color='secondary'
                  fullWidth
                />
              </Grid>
            </Grid>

            {/* Description input */}
            <TextField
              label="Description"
              placeholder='Great Analytical skills...'
              variant="outlined"
              color='secondary'
              fullWidth
              multiline
              rows={2}
              sx={{ marginTop: 2, }}
            />

            {/* Social Links input */}
            <TextField
              label="Gmail URL"
              placeholder='mailto:johndoe@example.com'
              variant="outlined"
              fullWidth
              sx={{ marginTop: 4, }}
            />
            <TextField
              label="LinkedIn URL"
              placeholder='www.linkedin.com/in/johndoe'
              variant="outlined"
              fullWidth
              sx={{ marginTop: 1, }}
            />
            <TextField
              label="Twitter URL"
              placeholder='twitter.com/johndoe'
              variant="outlined"
              fullWidth
              sx={{ marginTop: 1 }}
            />
            <TextField
              label="Facebook URL"
              placeholder='facebook.com/johndoe'
              variant="outlined"
              fullWidth
              sx={{ marginTop: 1 }}
            />

            {/* Categories input */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', marginTop: 2 }}>
              {/* Category Buttons */}
              {['Work', 'Personal', 'Business', 'Friends'].map((category) => (
                <Button
                  key={category}
                  variant={selectedCategories.includes(category) ? 'contained' : 'outlined'}
                  onClick={() => handleCategoryClick(category)}
                  sx={{
                    width: '30%',
                    borderRadius: '16px', // Add border radius
                    borderColor: 'rgb(233, 232, 232)',
                    textTransform: 'capitalize', // Capitalize only the first letter
                    backgroundColor: selectedCategories.includes(category) ? '#f24646' : 'transparent',
                    color: selectedCategories.includes(category) ? '#fff' : 'inherit',
                    '&:hover': {
                      backgroundColor: selectedCategories.includes(category) ? '#d42f2f' : '#f0f0f0',
                    },
                    '&:focus': {
                      backgroundColor: selectedCategories.includes(category) ? '#f24646' : 'transparent',
                    },
                  }}
                >
                  {category}
                </Button>
              ))}
            </Box>

            {/* Display Box */}
            <Box
              sx={{
                marginTop: 2,
                padding: 1,
                pl: 2,
                border: '1px solid #fff',
                borderRadius: 1,
                minHeight: 60,
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 1,
                bgcolor: 'rgb(245, 243, 243)',
              }}
            >
              {selectedCategories.length > 0 ? (
                selectedCategories.map((category, index) => (
                  <Chip
                    key={index}
                    label={category}
                    onDelete={() => handleRemoveCategory(category)}
                    sx={{ backgroundColor: '#f53838', color: '#fff', }}
                  />
                ))
              ) : (
                <Typography variant="body1" color="grey" fontWeight='bold' >
                  No Categories Selected
                </Typography>
              )}
            </Box>



            {/* Buttons: Edit and Cancel */}
            <Box sx={{ display: 'flex', gap: 2, marginTop: 3, justifyContent: 'flex-end' }}>
              <Button
                variant="text"
                color="secondary"
                onClick={handleClose}
                sx={{ width: '30%', borderRadius: '10px', backgroundColor:'rgb(243, 238, 238)',
                  '&:hover': {backgroundColor:'rgb(230, 230, 230)',},
                  '&:focus': {backgroundColor:'rgb(235, 235, 235)',},
                 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ width: '30%', backgroundColor: 'rgb(247, 50, 50)', borderRadius: '10px' }}
              >
                Edit
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      
    </>
  );
};

export default EditProfileModal;