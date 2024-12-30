import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, IconButton, Chip } from '@mui/material';
import GmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import DeleteIcon from '@mui/icons-material/Delete';  // Import delete icon
import EditProfileModal from './EditProfileModal';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

const Profilecard = ({ name, role, image, description, socialLinks, categories }) => {
  return (
    <Card 
      sx={{ 
        maxWidth: 350, 
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
          sx={{ width: 60, height: 60 }}
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
              <GmailIcon sx={{ color: '#fff' }} />
            </IconButton>
          )}
          {socialLinks.linkedin && (
            <IconButton 
              color="inherit" 
              href={socialLinks.linkedin} 
              target="_blank" 
              aria-label="LinkedIn"
            >
              <LinkedInIcon sx={{ color: '#fff' }} />
            </IconButton>
          )}
          {socialLinks.twitter && (
            <IconButton 
              color="inherit" 
              href={socialLinks.twitter} 
              target="_blank" 
              aria-label="Twitter"
            >
              <TwitterIcon sx={{ color: '#fff' }} />
            </IconButton>
          )}
          {socialLinks.facebook && (
            <IconButton 
              color="inherit" 
              href={socialLinks.facebook} 
              target="_blank" 
              aria-label="Facebook"
            >
              <FacebookIcon sx={{ color: '#fff' }} />
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
        <EditProfileModal />

        {/* delete button */}
        <IconButton 
          color="error" 
          aria-label="delete"
          sx={{ width: 30, height: 30, }}  // Set smaller size for the delete button
        >
          <DeleteOutlineRoundedIcon sx={{ color: '#ed7632', fontSize: '20px' }} />
        </IconButton>
      </Box>
    </Card>
  );
};

export default Profilecard;