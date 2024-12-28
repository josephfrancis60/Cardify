import React from 'react'
import EditIcon from '@mui/icons-material/Edit';      // Import edit icon
import { IconButton } from '@mui/material';


const EditProfileModal = () => {
  return (
    <IconButton
      color='primary'
      aria-label='edit'
      sx={{ width: 30, height: 30 }}   // Set smaller size for the edit button
    >
        <EditIcon sx={{ color: '#fff', fontSize: '20px' }} />
    </IconButton>
  )
}

export default EditProfileModal
