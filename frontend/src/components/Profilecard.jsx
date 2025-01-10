import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Avatar, IconButton, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Button, } from '@mui/material';
import EditProfileModal from './EditProfileModal';
import deleteicon from '../assets/icons/delete.png'; // delete icon
import gmailicon from '../assets/icons/gmail.png'; // gmail icon
import linkedinicon from '../assets/icons/linkedin.png'; // linkedin icon
import twittericon from '../assets/icons/twitter.png'; // twitter icon
import facebookicon from '../assets/icons/facebook.png'; // facebook icon

const Profilecard = ({ id, name, role, image, description, socialLinks, categories, deleteProfile, users, setUsers }) => {

  const [openModal, setOpenModal] = useState(false);  // visibility of confirmation modal

  const handleOpenModal = () => setOpenModal(true);  // open the modal
  const handleCloseModal = () => setOpenModal(false);  // close the modal

  // function to handle deleting the profile
  const handleDeleteProfile = () => {
    deleteProfile(id);  // call the deleteProfile function as a prop
    setOpenModal(false);  // clode modal after deleting
  };

  return (
    <Card 
      sx={{ 
        width: 350, 
        boxShadow: 3, 
        borderRadius: 2, 
        overflow: 'hidden', 
        backgroundColor: '#11161f', // Dark bluish-gray color for the card
        height: 310,  // Fixed height for the entire card
        position: 'relative',  // Set position relative to enable absolute positioning inside the card
        transition: 'transform 0.3s',
        '&:hover': {transform: 'scale(1.05)'},
      }}
    >
      {/* Profile Image and Name */}
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Profile Image */}
        <Avatar
          src={image}
          alt={name}
          sx={{ width: 60, height: 60, border: '2px solid rgb(255, 44, 44)' }}
        />
        
        {/* Profile Name and Role */}
        <Box>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ fontWeight: 'bold', color: '#fff' }}  // Name in white
          >
            {name}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ color: '#A0A0A0' }}  // Role in gray
          >
            {role}
          </Typography>
        </Box>
      </CardContent>

      {/* Description */}
      <CardContent sx={{ paddingBottom: 0, paddingTop: 0 }}>
        {/* Scrollable Description Box */}
        <Box 
          sx={{ 
            maxHeight: 80,  
            overflowY: 'auto', 
            color: '#fff',  
            marginBottom: 2,
            textAlign: 'left',
            paddingRight: 1,
            // Styles for the scrollbar
            '&::-webkit-scrollbar': {width: '4px',},
            '&::-webkit-scrollbar-thumb': {backgroundColor: '#636363', borderRadius: '4px'},
            '&::-webkit-scrollbar-thumb:hover': {backgroundColor: '#757575'},
            '&::-webkit-scrollbar-track': {backgroundColor: '#c9c9c9', borderRadius: '4px'},
            // '&::-webkit-scrollbar': {display: 'none'}, FOR HIDING THE SCROLLBAR
          }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ color: '#fff' }}  
          >
            {description}
          </Typography>
        </Box>

        {/* Social Links */}
        <Box sx={{ display: 'flex', gap: 1, marginBottom: 2 }}>
          {socialLinks.gmail && (
            <IconButton 
              color="inherit" 
              href={socialLinks.gmail} 
              target="_blank" 
              aria-label="Gmail"
            >
              <img src={gmailicon} alt='gmail_icon' style={{width:25, height:25}} />
            </IconButton>
          )}
          {socialLinks.linkedin && (
            <IconButton 
              color="inherit" 
              href={socialLinks.linkedin} 
              target="_blank" 
              aria-label="LinkedIn"
            >
              <img src={linkedinicon} alt='linkedin_icon' style={{width:25, height:25}} />
            </IconButton>
          )}
          {socialLinks.twitter && (
            <IconButton 
              color="inherit" 
              href={socialLinks.twitter} 
              target="_blank" 
              aria-label="Twitter"
            >
              <img src={twittericon} alt='twitter_icon' style={{width:25, height:25,}} />
            </IconButton>
          )}
          {socialLinks.facebook && (
            <IconButton 
              color="inherit" 
              href={socialLinks.facebook} 
              target="_blank" 
              aria-label="Facebook"
            >
              <img src={facebookicon} alt='facebook_icon' style={{width:25, height:25}} />
            </IconButton>
          )}
        </Box>

        {/* Categories */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {categories.map((category, index) => (
            <Chip key={index} label={category} sx={{ backgroundColor: '#f53838', color: '#fff' }} />  // Light red chip
          ))}
        </Box>
      </CardContent>

      {/* Edit and Delete Buttons */}
      <Box 
        sx={{ 
          position: 'absolute',  // Position the buttons absolutely within the card
          bottom: 10,  // Positioned at the bottom of the card
          right: 10,   // Positioned at the right of the card
          display: 'flex', 
          gap: 1 
        }}
      >
        {/* edit button - Edit Porfile Modal */}
        <EditProfileModal
          user={users.find(user => user.id === id)}  // passing user data for editing
          setUsers={setUsers}  // allow updating users
        />

        {/* delete button */}
        <IconButton 
          color="error" 
          aria-label="delete"
          sx={{ width: 30, height: 30, }}  // Set smaller size for the delete button
          onClick={handleOpenModal}  // open the confirmation modal
        >
          <img src={deleteicon} alt='delete_icon' style={{width:20, height:20}} />   
          {/*<DeleteOutlineRoundedIcon sx={{ color: '#ed7632', fontSize: '20px' }} /> */}
        </IconButton>
      </Box>

      {/* confirmation modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby='confirmation-dialog-title'
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '10px',
            backgroundColor: 'rgb(240, 240, 240)',
          }
        }}
      >
        <DialogContent 
          id='confirmation-dialog-title'
          sx={{ fontFamily: 'sans-serif' }}
        >
          Are you sure you want to delete "{name}"?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseModal}
            color='primary'
            sx={{ borderRadius:'15px', backgroundColor:'transparent',
              '&:hover': {backgroundColor:'rgb(220, 220, 220)',},
              textTransform: 'capitalize',
             }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteProfile}
            color='error'
            sx={{ borderRadius:'15px', backgroundColor:'transparent',
              '&:hover': {backgroundColor:'rgb(255, 230, 230)',},
              textTransform: 'capitalize',          
             }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </Card>
  );
};

export default Profilecard;