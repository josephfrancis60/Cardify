import React, { useState } from 'react';
import { Grid, Button, Modal, Box, TextField, Typography, IconButton, Chip, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
// import Grid from '@mui/material/Grid2';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import CloseIcon from '@mui/icons-material/Close'; // Close icon for the modal
import { BASE_URL } from '../App'; // Replace with your actual base URL
import { Snackbar, Alert } from '@mui/material';

const CreateProfileModal = ({ setUsers }) => {
  const [open, setOpen] = useState(false); // Modal open state
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    gmail: '',
    linkedin: '',
    twitter: '',
    facebook: '',
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [gender, setGender] = useState(''); // State for gender

  // add (https://) prefix to socialLinks if not already present
  const formattedSocialLinks = Object.fromEntries(
    Object.entries(socialLinks).map(([key, value]) => [
      key,
      value ? (value.startsWith('http://') || value.startsWith('https://') ? value : `https://${value}`) : '',
    ])
  );

  const [openSnackbar, setOpenSnackbar] = useState(false);  // snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState('');  // Snackbar message 

  const handleOpen = () => setOpen(true); // Open the modal
  const handleClose = () => setOpen(false); // Close the modal

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare profile data
    const profileData = {
      name,
      role,
      description,
      gender,
      socialLinks: formattedSocialLinks,
      categories: selectedCategories,
    };
    console.log(profileData);  //from client 

    try {
      const response = await fetch(`${BASE_URL}/profiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();
      console.log(data);  // response from api server
      
      if (response.ok) {
        setUsers((prevUsers) => [...prevUsers, data]); // Add new profile to the existing users
        // TOAST
        setSnackbarMessage('Profile created successfully!');
        setOpenSnackbar(true);
        handleClose(); // Close modal after successful submission

        // clear imputs after successfull submission
        setName('');
        setRole('');
        setDescription('');
        setGender('');
        setSelectedCategories([]);
        setSocialLinks({
          gmail: '',
          linkedin: '',
          twitter: '',
          facebook: '',
        });

      } else {
        console.error('Error creating profile:', data.error);                //TODO  : proper toast msg for missing / required fields
        setSnackbarMessage(data.error);
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      setSnackbarMessage('Failed to create profile.');
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        size="medium"
        startIcon={<AddToPhotosOutlinedIcon />}
        onClick={handleOpen}
        sx={{
          width: { xs: 'auto', sm: '150px' },
          height: { xs: '40px', sm: '50px' },
          marginY: { xs: '0', sm: '10px' },
          marginRight: { xs: '10px', sm: '0' },
          backgroundColor: '#ff0000',
          '&:hover': { backgroundColor: '#f53838' },
          textTransform: 'none',
          fontWeight: 'bold',
          fontSize: '19px',
          borderRadius: '10px',
        }}
      >
        Create
      </Button>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-profile-modal"
        aria-describedby="create-profile-description"
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
            <Typography variant="h6" fontWeight='bold' color='rgb(247, 50, 50)' >My New Profile</Typography>
            <IconButton onClick={handleClose} sx={{ color: 'rgb(110, 103, 103)' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Scrollable Content */}
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
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Role"
                  variant="outlined"
                  fullWidth
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </Grid>
            </Grid>

            {/* Description input */}
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ marginTop: 2, }}
            />

            {/* Gender Radio Buttons */}
            <FormControl component="fieldset" sx={{ marginTop: 2 }}>
              <Typography variant="body1" gutterBottom>
                Gender
              </Typography>
              <RadioGroup
                row
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl>

            {/* Social Links input */}
            <TextField
              label="Gmail URL"
              variant="outlined"
              fullWidth
              value={socialLinks.gmail}
              onChange={(e) => setSocialLinks({ ...socialLinks, gmail: e.target.value })}
              sx={{ marginTop: 2 }}
            />
            <TextField
              label="LinkedIn URL"
              variant="outlined"
              fullWidth
              value={socialLinks.linkedin}
              onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
              sx={{ marginTop: 1 }}
            />
            <TextField
              label="Twitter URL"
              variant="outlined"
              fullWidth
              value={socialLinks.twitter}
              onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
              sx={{ marginTop: 1 }}
            />
            <TextField
              label="Facebook URL"
              variant="outlined"
              fullWidth
              value={socialLinks.facebook}
              onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
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
                    backgroundColor: selectedCategories.includes(category) ? '#f53838' : 'transparent',
                    color: selectedCategories.includes(category) ? '#fff' : 'inherit',
                    '&:hover': {
                      backgroundColor: selectedCategories.includes(category) ? '#d42f2f' : '#f0f0f0',
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
                padding: 2,
                border: '1px solid #ccc',
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

            {/* Buttons: Submit and Cancel */}
            <Box sx={{ display: 'flex', gap: 2, marginTop: 3, justifyContent: 'flex-end' }}>
              <Button
                variant="text"
                color="secondary"
                onClick={handleClose}
                sx={{ width: '30%', borderRadius: '10px', backgroundColor:'rgb(250, 250, 250)', }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ width: '30%', backgroundColor: 'rgb(247, 50, 50)', borderRadius: '10px' }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      
      {/* Snackbar for success and error */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarMessage.includes('successfully') ? 'success' : 'error'}
          sx={{width: '100%'}}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateProfileModal;