import React from "react";
import { IconButton } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


const EditProfileModal = () => {
  

  return (
    <>
      <IconButton
        color="primary"
        aria-label="edit"
        sx={{ width: 30, height: 30 }}
      >
        <EditOutlinedIcon sx={{ color: "#fff", fontSize: "20px" }} />
      </IconButton>

      
    </>
  );
};

export default EditProfileModal;