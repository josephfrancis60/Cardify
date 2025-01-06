import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Profilecard from './Profilecard';
// import mockUsers from '../Mockdata';
import { Box, CircularProgress, Typography } from '@mui/material';
import { BASE_URL } from '../App';

const Profilegrid = ({selectedCategory, users, setUsers}) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(BASE_URL + "/profiles")    // later change to /category/all 
        const data = await res.json();

        if(!res.ok) {
          throw new Error(data.error);
        }
        setUsers(data);
      }
      catch (error) {
        console.error("Error fetching profiles:", error);
      }
      finally {
        setLoading(false);
      }
    }
    getUsers();
  }, [setUsers]);

  return (
    <Box>
      <Typography  // Heading 
        variant='h5'
        fontWeight='bold'
        marginBottom={1}
        marginLeft={4}
        sx={{
          color:'white',
        }}
      >
        {selectedCategory} <span style={{color: "#ff0000"}}>Profile cards</span>
      </Typography>

      <Grid
        container
        spacing={3}
        sx={{
          padding: 2,
          justifyContent: 'center', // Center the grid within the container
          margin: 'auto', // Center the grid horizontally
        }}
      >
        {users.map((user) => (
          <Grid
            item
            xs={12} // Full-width on extra-small screens
            sm={6} // Two cards per row on small screens
            md={4} // Three cards per row on medium and larger screens
            key={user.id}
          >
            <Profilecard
              name={user.name}
              role={user.role}
              image={user.imgUrl}
              description={user.description}
              socialLinks={user.socialLinks}
              categories={user.categories}
            />
          </Grid>
        ))}
      </Grid> 
      
      {/* loading circle if no need - remove isloading, setloading */}
      {isLoading && (
        <Box sx={{display:'flex', justifyContent: "center", alignItems:'center'}}>
          <CircularProgress color='#ff0000' /> 
        </Box>
      )}

      {/* msg if no profiles */}
      {!isLoading && users.length === 0 && (
        <Box sx={{display:'flex', justifyContent:'center',alignItems:'center',flexDirection:'column' , marginTop:20, gap:1}}>
          <Typography variant='h5' color='rgb(187, 178, 178)' fontWeight='bold' >
            Oops! No Profiles... 🙁
          </Typography> 
          <Typography variant='caption' color='rgba(147, 145, 145, 0.8)' fontWeight='bold' >
            Create a new Profile to see cards 
          </Typography>
        </Box>
      )}

    </Box>
  );
};

export default Profilegrid;