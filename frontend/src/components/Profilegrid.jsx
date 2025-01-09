import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Profilecard from './Profilecard';
// import mockUsers from '../Mockdata';
import { Box, CircularProgress, Snackbar, Alert, Typography } from '@mui/material';
import { BASE_URL } from '../App';

const Profilegrid = ({selectedCategory, users, setUsers}) => {
  const [isLoading, setLoading] = useState(true);


  const [openSnackbar, setOpenSnackbar] = useState(false);  // snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState('');  // Snackbar message 

  // function to handle delete profile
  const deleteProfile = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/profiles/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete profile");
      }
      // filter out the deleted profile from the 'users' state
      setUsers(users.filter((user) => user.id !== id));
      console.log(`Profile Deleted, ID: ${id}`)
      setSnackbarMessage('Profile deleted successfully');
      setOpenSnackbar(true);
    }
    catch (error) {
      console.error("Error deleting profile", error);
      setSnackbarMessage('Failed to delete profile');
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true); // Start loading when fetching data
      try {
        const endpoint =
          selectedCategory.toLowerCase() === "all"
            ? `${BASE_URL}/profiles`
            : `${BASE_URL}/profiles/category/${selectedCategory}`;
  
        const res = await fetch(endpoint);
        const data = await res.json();
  
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch profiles");
        }
  
        // Update the users state with fetched data or an empty array if no profiles are found
        setUsers(data.length > 0 ? data : []);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        setUsers([]); // Reset users to an empty array in case of an error
      } finally {
        setLoading(false); // End loading after fetching data
      }
    };
  
    getUsers();
  }, [selectedCategory, setUsers]);

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
              id={user.id}
              name={user.name}
              role={user.role}
              image={user.imgUrl}
              description={user.description}
              socialLinks={user.socialLinks}
              categories={user.categories}
              deleteProfile={deleteProfile}  // pass the delete function
              users={users}
              setUsers={setUsers}  // pass setusers which has the profile data
            />
          </Grid>
        ))}
      </Grid> 
      
      {/* loading circle if no need - remove isloading, setloading */}
      {isLoading && (
        <Box 
          sx={{
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
        }}
        >
          <CircularProgress sx={{ color: 'rgb(255, 42, 42)' }} />
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

      {/* snackbar  */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
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

    </Box>
  );
};

export default Profilegrid;