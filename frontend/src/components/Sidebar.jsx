import React from "react";  
import { Box, Button, Typography } from "@mui/material";  
import AddIcon from "@mui/icons-material/Add";  
import WorkIcon from "@mui/icons-material/Work";  
import PersonIcon from "@mui/icons-material/Person";  
import BusinessIcon from "@mui/icons-material/Business";  
import PeopleIcon from "@mui/icons-material/People";  
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";  

const categories = [  
  { label: "All", icon: <AllInclusiveIcon /> },  
  { label: "Work", icon: <WorkIcon /> },  
  { label: "Personal", icon: <PersonIcon /> },  
  { label: "Business", icon: <BusinessIcon /> },  
  { label: "Friends", icon: <PeopleIcon /> },  
];  

const Sidebar = () => {  
  return (  
    <Box  
      sx={{  
        display: "flex",  
        flexDirection: "column",  
        justifyContent: "space-between",  
        height: "100%",  
      }}  
    >  
      {/* Top Section with "Create" Button */}  
      <Box>  
        <Button  
          variant="contained"  
          size="medium"  
          startIcon={<AddIcon />}  
          sx={{  
            width: "70%",  
            marginY: "50px",  
            backgroundColor: "#1976d2",  
            "&:hover": { backgroundColor: "#115293" },  
          }}  
        >  
          Create  
        </Button>  

        {/* Category Navigation Buttons */}  
        {categories.map((category, index) => (  
          <Button  
            key={index}  
            variant="outlined"  
            size="small"  
            sx={{  
              width: "100%",  
              marginBottom: "10px",  
              color: "#fff",  
              borderColor: "#fff",  
              "&:hover": {  
                backgroundColor: "#333",  
                borderColor: "#fff",  
              },
              justifyContent: "flex-start",
              paddingLeft: "20px",
                
            }}  
          > 
            <span style={{
                marginRight: "15px",
                color: "red",
            }}>
              {category.icon}
            </span> 
            <span>
              {category.label}
            </span>  
          </Button>  
        ))}  
      </Box>  

      {/* Bottom Section with Tagline */}  
      <Typography  
        variant="caption"  
        align="center"  
        sx={{  
          color: "#bbb",  
          marginTop: "20px",  
        }}  
      >  
        Your Project Tagline Goes Here  
      </Typography>  
    </Box>  
  );  
};  

export default Sidebar;