import React from 'react'
import AddIcon from "@mui/icons-material/Add";
import { Button } from '@mui/material';


const CreateProfileModal = () => {
  return (
    <Button 
    variant="contained"
    size="medium"
    startIcon={<AddIcon />}
    sx={{
      width: "150px",  // 70%
      height: "50px",
      marginY: "70px",
      backgroundColor: "#ff0000",
      "&:hover": { backgroundColor: "#115293" },
    }}
    >
        Create
    </Button>
  )
}

export default CreateProfileModal